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
  const isMobile = window.innerWidth <= 600;


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
    
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: isMobile ? '1.1rem' : '2rem',
        textShadow: '0 2px 8px #000',
        minHeight: isMobile ? '100vh' : undefined,
        padding: isMobile ? '12px 0' : '0',
        width: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <button
        className='generate-button'
        style={{
          position: 'absolute',
          top: isMobile ? 8 : 20,
          left: isMobile ? 8 : 20,
          padding: isMobile ? '6px 12px' : '8px 16px',
          fontSize: isMobile ? '0.9rem' : '1rem',
          zIndex: 2,
        }}
        onClick={() => {
          window.location.href = '/';
        }}
      >
        ← Back to Home
      </button>
      <h1 style={{ fontSize: isMobile ? '1.7rem' : '3rem', textAlign: 'center', marginTop: isMobile ? 32 : 0 }}>
        <TypewriterText text="React + TS Onnx Model Inference" speed={100} showCaret={true} loop={false} />
      </h1>
      <p style={{ fontSize: isMobile ? '1rem' : '1.5rem', marginBottom: isMobile ? '12px' : '20px', textAlign: 'center', maxWidth: isMobile ? '95vw' : undefined }}>
        Serverless onnx model inference using the Hugging Face <a href="https://huggingface.co/docs/transformers.js/en/index">Transformers.js</a> library.
      </p>
      <h2 style={{ fontSize: isMobile ? '1.2rem' : '2rem', marginBottom: isMobile ? '2px' : '5px', textAlign: 'center' }}>
        Multilingual Translation <a href="https://huggingface.co/Xenova/m2m100_418M">(Xenova/m2m100_418M)</a>
      </h2>

      <div style={{ marginBottom: isMobile ? 10 : 16 }}>
        <button
          style={{
            fontSize: isMobile ? '0.9rem' : '1rem',
            padding: isMobile ? '6px 12px' : '8px 16px',
            borderRadius: '8px',
            cursor: 'none',
            width: isMobile ? '90vw' : undefined,
            maxWidth: isMobile ? '95vw' : undefined,
          }}
          onClick={handleLoadModel}
          disabled={isLoading || modelLoaded}
        >
          {modelLoaded ? 'Model Loaded' : isLoading ? 'Setting up Model...' : 'Download Model'}
        </button>
      </div>

      <div style={{
        marginBottom: isMobile ? '16px' : '25px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: isMobile ? '100vw' : undefined,
      }}>
        <input
          style={{
            width: isMobile ? '90vw' : '300px',
            fontSize: isMobile ? '1.1rem' : '1.5rem',
            padding: isMobile ? '8px' : undefined,
            borderRadius: '8px',
            border: '1px solid #444',
            boxSizing: 'border-box',
            margin: '0 auto',
          }}
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text to translate"
        />
      </div>

      <div style={{
        marginBottom: isMobile ? '16px' : '25px',
        display: isMobile ? 'block' : 'flex',
        gap: isMobile ? undefined : '25px',
        width: isMobile ? '90vw' : undefined,
        maxWidth: isMobile ? '95vw' : undefined,
        textAlign: isMobile ? 'center' : undefined,
      }}>
        <div style={{ marginBottom: isMobile ? '8px' : 0 }}>
          <span style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>From:</span>
          <select
            style={{
              fontSize: isMobile ? '0.95rem' : '1rem',
              cursor: 'none',
              width: isMobile ? '80vw' : undefined,
              marginLeft: isMobile ? '8px' : undefined,
              marginTop: isMobile ? '4px' : undefined,
            }}
            value={srcLang}
            onChange={handleSrcLangChange}
          >
            {languageOptions.map((language: { value: string; label: string }) => (
              <option
                style={{ fontSize: isMobile ? '0.95rem' : '1rem', cursor: 'none' }}
                key={language.value}
                value={language.value}
              >
                {language.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>To:</span>
          <select
            style={{
              fontSize: isMobile ? '0.95rem' : '1rem',
              cursor: 'none',
              width: isMobile ? '80vw' : undefined,
              marginLeft: isMobile ? '8px' : undefined,
              marginTop: isMobile ? '4px' : undefined,
            }}
            value={tgtLang}
            onChange={handleTgtLangChange}
          >
            {languageOptions.map((language: { value: string; label: string }) => (
              <option
                style={{ fontSize: isMobile ? '0.95rem' : '1rem', cursor: 'none' }}
                key={language.value}
                value={language.value}
              >
                {language.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <button
          className='generate-button'
          onClick={handleGenerate}
          disabled={isLoading || !modelLoaded || !inputText.trim()}
          style={{
            fontSize: isMobile ? '1rem' : undefined,
            padding: isMobile ? '8px 16px' : undefined,
            width: isMobile ? '90vw' : undefined,
            maxWidth: isMobile ? '95vw' : undefined,
            borderRadius: '8px',
            marginBottom: isMobile ? '12px' : undefined,
          }}
        >
          {isLoading ? 'Loading model...' : 'Generate'}
        </button>
      </div>
      <div style={{ width: isMobile ? '95vw' : undefined }}>
        {result && (
          <p style={{ fontSize: isMobile ? '1.1rem' : undefined, wordBreak: 'break-word' }}>
            Result: {Array.isArray(result) ? result[0]?.translation_text : result.translation_text}
          </p>
        )}
        {error && (
          <div style={{
            color: 'red',
            marginTop: 16,
            fontSize: isMobile ? '1rem' : '1.2rem',
            maxWidth: isMobile ? '95vw' : 600,
            textAlign: 'center',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            Error: {error}
          </div>
        )}
      </div>
    </div>
    
  );
};

export default OnnxInference;