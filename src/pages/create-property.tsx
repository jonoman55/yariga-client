import { useState } from 'react';
import { useGetIdentity, useNotification } from '@pankod/refine-core';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';

import { Form } from 'components';
import { PropertyImage } from 'interfaces/property';

/**
 * Initial Property Image State
 */
const initalImgState: PropertyImage = {
  name: '',
  url: ''
};

/**
 * Create Property Form
 */
const CreateProperty = () => {
  const { open } = useNotification();
  const { data: user } = useGetIdentity();

  const [propertyImage, setPropertyImage] = useState<PropertyImage>(initalImgState);

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, _reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });
    reader(file).then(
      (result: string) => setPropertyImage({
        name: file?.name,
        url: result
      })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) return open?.({
      type: 'error',
      message: 'Please select an image',
      key: 'create-select-img',
      undoableTimeout: 5000,
    });
    await onFinish({
      ...data,
      photo: propertyImage.url,
      email: user.email
    });
  };

  return (
    <Form
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};

export default CreateProperty;