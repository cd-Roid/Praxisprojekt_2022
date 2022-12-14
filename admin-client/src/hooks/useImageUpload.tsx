export const onImageChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  updateStateFunc: (value: React.SetStateAction<File | undefined>) => void,
) => {
  if (event.target.files && event.target.files[0] && event.target.files[0].type === 'image/png') {
    const img = event.target.files[0];
    updateStateFunc(img);
  } else {
    // TODO: add a nofitication box
    console.log('Please upload a png file');
  }
};

export const onChangeFunc = (
  event: React.ChangeEvent<HTMLInputElement>,
  updateStateFunc: (value: React.SetStateAction<string>) => void,
) => {
  updateStateFunc(event.target.value);
};
