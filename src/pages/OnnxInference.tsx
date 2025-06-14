import React, { useEffect, useRef, useState } from 'react';
import { pipeline } from '@huggingface/transformers';
import '../css/App.css';
import languageOptions from '../js/languageOptions'; 
import TypewriterText from '../TypewriterText';

const OnnxInference: React.FC = () => {
  const task = 'translation';
  const model = 'Xenova/m2m100_418M';

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const pipelineInstance = useRef<any>(null);
  const [inputText, setInputText] = useState('');
  const [srcLang, setSrcLang] = useState('en');
  const [tgtLang, setTgtLang] = useState('fr');

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
      const inferenceResult = await pipelineInstance.current(inputText, {
        src_lang: srcLang,
        tgt_lang: tgtLang,
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
          textShadow: '0 2px 8px #000',
          }}>

      <h1 style={{ fontSize: '3rem' }}><TypewriterText text="React + TS Onnx Model Inference" speed={100} showCaret={true} loop={false} /></h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
        Serverless onnx model inference using the Hugging Face <a href="https://huggingface.co/docs/transformers.js/en/index">Transformers.js</a> library.
      </p>
      <h2 style={{ fontSize: '2rem', marginBottom: '5px' }}>Multilingual Translation Test</h2>
      
      <div style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
        <p style={{ fontSize: '1.5rem' }}> 
         <input style={{ width: '300px', fontSize: '1.5rem' }} type="text" value={inputText} onChange={handleInputChange} placeholder="Enter text to translate" />
        </p> 
      </div>

      <div style={{ marginBottom: '25px', display: 'flex', gap: '25px' }}>
          <p style={{ fontSize: '1rem' }}>From:</p>
          <select value={srcLang} onChange={handleSrcLangChange}>
        {languageOptions.map((language: { value: string; label: string }) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
      <p style={{ fontSize: '1rem' }}>To:</p>
      <select value={tgtLang} onChange={handleTgtLangChange}>
        {languageOptions.map((language: { value: string; label: string }) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
      </div>

      <div>
        <button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? 'Loading model...' : 'Generate'}
      </button>
      
      </div>
      <div>
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