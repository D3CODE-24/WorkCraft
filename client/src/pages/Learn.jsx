import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import YouTube from 'react-youtube';
import { Card, CardContent, CardHeader,CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
function LearningComponent() {
  const [inputValue, setInputValue] = useState('');
  const [trends, setTrends] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBd41mJQxzXSJ0KQaSJgufNnyciMOM5nHQ" 
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Prompt for trends
      const trendsPrompt = `What are the current trends in the field of ${inputValue.split(',')[0]}?`;
      const trendsResult = await model.generateContent(trendsPrompt);
      const trendsText = trendsResult.response.text();
      setTrends(trendsText);

      // Prompt for learning roadmap
      const skill = inputValue.split(',')[1];
      const roadmapPrompt = `Create a roadmap for learning ${skill} in the field of ${inputValue.split(',')[0]}`;
      const roadmapResult = await model.generateContent(roadmapPrompt);
      const roadmapText = roadmapResult.response.text();
      setRoadmap(roadmapText);

      // Fetch resources (e.g., YouTube videos)
      const resourcesPrompt = `Find relevant YouTube videos for learning ${skill} in the field of ${inputValue.split(',')[0]}`;
      const resourcesResult = await model.generateContent(resourcesPrompt);
      const resourcesText = resourcesResult.response.text();
      const videoUrls = extractVideoUrls(resourcesText);
      setResources(videoUrls);

      setLoading(false);
    } catch (error) {
      console.error(error);
      console.log("Something Went Wrong");
      setLoading(false);
    }
  };

  const extractVideoUrls = (text) => {
    const regex = /https?:\/\/(www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/g;
    const matches = text.match(regex);
    return matches || [];
  };

  
  

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center space-y-6">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Enter Your Field and Skill
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter your field and skill (e.g., 'web development, JavaScript')"
              className="w-full"
            />
            <Button 
              onClick={getResponseForGivenPrompt}
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Learning Resources'}
            </Button>
          </CardContent>
        </Card>

        {!loading && (trends || roadmap || resources.length > 0) && (
          <div className="w-full max-w-2xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Trends in {inputValue.split(',')[0]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{trends}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Learning Roadmap for {inputValue.split(',')[1]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{roadmap}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Recommended Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
              {resources.map((url, index) => (
        <div key={index} className="aspect-w-16 aspect-h-9">
           <YouTube videoId={url.match(/v=([A-Za-z0-9_-]{11})/)[1]} /> 
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningComponent;