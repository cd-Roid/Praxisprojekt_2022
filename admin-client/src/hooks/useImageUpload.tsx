import { useToast } from './useToast';

import React from 'react';

const useImageUpload = () => {
  const { notify } = useToast();
  const onImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    updateStateFunc: (value: React.SetStateAction<File | undefined>) => void,
  ) => {
    if (event.target.files && event.target.files[0] && event.target.files[0].type === 'image/png') {
      const img = event.target.files[0];
      updateStateFunc(img);
    } else {
      notify('error', 'Please upload a png file', false);
    }
  };

  const onChangeFunc = (
    event: React.ChangeEvent<HTMLInputElement>,
    updateStateFunc: (value: React.SetStateAction<string>) => void,
  ) => {
    updateStateFunc(event.target.value);
  };

  return { onImageChange, onChangeFunc };
};

export default useImageUpload;
