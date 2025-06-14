import React, { useEffect, useRef, useState } from 'react';
import { pipeline } from '@huggingface/transformers';
import '../css/App.css';

const OnnxInference: React.FC = () => {
  const task = 'translation';
  const model = 'Xenova/m2m100_418M';

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const pipelineInstance = useRef<any>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsLoading(true);
        const instance = await pipeline(task, model);
        console.log('Model loaded successfully:', instance);
        pipelineInstance.current = instance;
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading model:', error);
        setIsLoading(false);
      }
    };
    loadModel();
  }, []);

  const handleGenerate = async () => {
    try {
      if (!pipelineInstance.current) {
        console.error('Model not loaded yet!');
        return;
      }
      const inferenceResult = await pipelineInstance.current('Hello, how are you?', {
        src_lang: 'en',
        tgt_lang: 'zh',
      });
      console.log('Translation:', inferenceResult);
      setResult(inferenceResult);
    } catch (error) {
      console.error('Error during inference:', error);
    }
  };

  return (
    <div style={{
          position: 'relative',
          zIndex: 1,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
          textShadow: '0 2px 8px #000',
          paddingTop: '5vh',}}>
      <h1>Local Onnxruntime Inference</h1>
      
      <div>
        <button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? 'Loading model...' : 'Generate'}
      </button>
      {result && (
        <p>
          Result: {Array.isArray(result) ? result[0]?.translation_text : result.translation_text}
        </p>
      )}
      </div>
  
    </div>
    
  );
};

export default OnnxInference;