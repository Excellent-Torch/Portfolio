import React, { useEffect, useRef, useState } from 'react';


import { pipeline } from '@huggingface/transformers';
import '../css/App.css';
import languageOptions from '../components/languageOptions'; 
import TypewriterText from '../components/TypewriterText';

const OnnxInference: React.FC = () => {
  const task = 'translation';
  const model = 'Xenova/m2m100_418M';

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const pipelineInstance = useRef<any>(null);
  const [inputText, setInputText] = useState('');
  const [srcLang, setSrcLang] = useState('en');
  const [tgtLang, setTgtLang] = useState('fr');
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null); 



  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'ONNX React Inference';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

   const handleSrcLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSrcLang(event.target.value);
  };

  const handleTgtLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTgtLang(event.target.value);
  };

 const handleLoadModel = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const instance = await pipeline(task, model);
      pipelineInstance.current = instance;
      setModelLoaded(true);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error?.message || String(error));
      console.error('Error loading model:', error);
    }
  };

  const handleGenerate = async () => {
    try {
      setError(null);
      if (!pipelineInstance.current) {
        throw new Error('Model not loaded yet!');
      }
      const inferenceResult = await pipelineInstance.current(inputText, {
        src_lang: srcLang,
        tgt_lang: tgtLang,
      });
      setResult(inferenceResult);
    } catch (error: any) {
      setError(error?.message || String(error));
      console.error('Error during inference:', error);
    }
  };

  return (
    
    <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
          textShadow: '0 2px 8px #000',
          }}>
      <button
        className='generate-button'
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          padding: '8px 16px',
          fontSize: '1rem',
          
          zIndex: 2
        }}
        onClick={() => {
          window.location.href = '/';
        }}
        >
        ← Back to Home
      </button>
      <h1 style={{ fontSize: '3rem' }}><TypewriterText text="React + TS Onnx Model Inference" speed={100} showCaret={true} loop={false} /></h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
        Serverless onnx model inference using the Hugging Face <a href="https://huggingface.co/docs/transformers.js/en/index">Transformers.js</a> library.
      </p>
      <h2 style={{ fontSize: '2rem', marginBottom: '5px' }}>Multilingual Translation <a href="https://huggingface.co/Xenova/m2m100_418M">(Xenova/m2m100_418M) </a> </h2>
      
      <div style={{ marginBottom: 16 }}>
        <button style={{ fontSize: '1rem', padding: '8px 16px', borderRadius: '8px', cursor: 'none' }} onClick={handleLoadModel} disabled={isLoading || modelLoaded}>
          {modelLoaded ? 'Model Loaded' : isLoading ? 'Setting up Model...' : 'Download Model'}
        </button>
      </div>

      <div style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
        <p style={{ fontSize: '1.5rem' }}> 
         <input style={{ width: '300px', fontSize: '1.5rem' }} type="text" value={inputText} onChange={handleInputChange} placeholder="Enter text to translate" />
        </p> 
      </div>

      

      <div style={{ marginBottom: '25px', display: 'flex', gap: '25px' }}>
          <p style={{ fontSize: '1.2rem' }}>From:</p>
          <select style={{ fontSize: '1rem' , cursor: 'none' }} value={srcLang} onChange={handleSrcLangChange}>
        {languageOptions.map((language: { value: string; label: string }) => (
          <option style={{ fontSize: '1rem' , cursor: 'none' }} key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
      <p style={{ fontSize: '1.2rem' }}>To:</p>
      <select style={{ fontSize: '1rem' , cursor: 'none' }} value={tgtLang} onChange={handleTgtLangChange}>
        {languageOptions.map((language: { value: string; label: string }) => (
          <option style={{ fontSize: '1rem' , cursor: 'none' }} key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
      </div>

      <div>
        <button className='generate-button' onClick={handleGenerate} disabled={isLoading || !modelLoaded || !inputText.trim()}>
          {isLoading ? 'Loading model...' : 'Generate'}
        </button>
      
      </div>
      <div>
        {result && (
          <p>
            Result: {Array.isArray(result) ? result[0]?.translation_text : result.translation_text}
          </p>
        )}
        {error && (
          <div style={{ color: 'red', marginTop: 16, fontSize: '1.2rem', maxWidth: 600, textAlign: 'center', whiteSpace: 'pre-wrap' }}>
            Error: {error}
          </div>
        )}
      
      </div>
  
    </div>
    
  );
};

export default OnnxInference;