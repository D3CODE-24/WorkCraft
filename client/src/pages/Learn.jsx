import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import YouTube from "react-youtube";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import bgImage from "../assets/bg-image.jpeg";

function LearningComponent() {
  const [inputValue, setInputValue] = useState("");
  const [trends, setTrends] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyBd41mJQxzXSJ0KQaSJgufNnyciMOM5nHQ" // Replace with your actual API key
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);
      setError(null);
      const [field, skill] = inputValue.split(",").map((item) => item.trim());
      if (!field || !skill) {
        throw new Error(
          "Please enter both field and skill separated by a comma."
        );
      }

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Fetch trends
      const trendsPrompt = `List the current trends in the field of ${field}. Provide the response as a numbered list without additional text.`;
      const trendsResult = await model.generateContent(trendsPrompt);
      setTrends(parseList(trendsResult.response.text()));

      // Fetch learning roadmap
      const roadmapPrompt = `Create a detailed roadmap for learning ${skill} in the field of ${field}. Provide the response as a step-by-step list without any additional text and the output shouldnt contain any *.`;
      const roadmapResult = await model.generateContent(roadmapPrompt);
      setRoadmap(parseList(roadmapResult.response.text()));

      // Fetch resources (YouTube videos)
      const resourcesPrompt = `Find relevant YouTube videos for learning ${skill} in the field of ${field}. Provide only the video URLs.  Prioritize videos that are recent uploads from reputable channels, tutorials or official documentation sources. If possible, include the video title or a short description to help users better understand the content.Also give me a video url of rickroll`;
      const resourcesResult = await model.generateContent(resourcesPrompt);
      setResources(extractVideoUrls(resourcesResult.response.text()));

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  const parseList = (text) => {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line)
      .map((line) => line.replace(/^\d+[\).\s]/, ""));
  };

  const extractVideoUrls = (text) => {
    const urlRegex =
      /(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[A-Za-z0-9_-]{11})/g;
    return Array.from(text.matchAll(urlRegex), (m) => m[0]);
  };

  return (
    <div className="-mt-6 bg-black w-screen h-screen flex flex-col">
      <div
        className="bg-slate-700 flex-1  flex flex-col items-center justify-center space-y-8 w-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          opacity: "1",
        }}
      >
        <Card className="w-full max-w-2xl  shadow-lg opacity-100 mt-4">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-extrabold text-blue-600 ">
              Learning Path Finder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter your field and skill (e.g., 'Web Development, JavaScript')"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={getResponseForGivenPrompt}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Learning Resources"}
            </Button>
            {error && <div className="text-red-500 text-center">{error}</div>}
          </CardContent>
        </Card>

        {!loading &&
          (trends.length > 0 || roadmap.length > 0 || resources.length > 0) && (
            <div className="w-full max-w-2xl space-y-8">
              {/* Trends Section */}
              {trends.length > 0 && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-green-600">
                      Current Trends in {inputValue.split(",")[0].trim()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {trends.map((trend, index) => (
                        <li key={index} className="text-gray-800">
                          {trend}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Learning Roadmap Section */}
              {roadmap.length > 0 && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-yellow-600">
                      Learning Roadmap for {inputValue.split(",")[1].trim()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-2">
                      {roadmap.map((step, index) => (
                        <li key={index} className="text-gray-800">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              )}

              {/* Resources Section */}
              {resources.length > 0 && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-red-600">
                      Recommended YouTube Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-10 flex flex-col items-center">
                    {resources.map((url, index) => {
                      const videoId = url.split("v=")[1].split("&")[0];
                      return (
                        <div key={index} className="w-fit flex flex-col">
                          <YouTube
                            videoId={videoId}
                            className="w-full h-auto"
                            opts={{
                              height: "390",
                              width: "640",
                            }}
                          />
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline block mt-2 text-center"
                          >
                            Watch Video
                          </a>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
      </div>
    </div>
  );
}

export default LearningComponent;
