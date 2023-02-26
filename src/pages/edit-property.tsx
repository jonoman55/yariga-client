import { useMemo, useState } from 'react';
import { useGetIdentity, useNotification, useShow } from '@pankod/refine-core';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';

import { Form, ErrorBox, Spinner } from 'components';
import { PropertyImage } from 'interfaces/property';

/**
 * Initial Image State
 */
// const initalImgState: PropertyImage = {
//   name: '',
//   url: ''
// };

/**
 * Edit Property Form
 */
const EditProperty = () => {
  const { open } = useNotification();
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow();

  const {
    data: imgResult,
    isLoading,
    isError
  } = queryResult;

  const propertyDetails = useMemo(
    () => imgResult?.data ?? {},
    [imgResult?.data]
  );

  const imageUrl = useMemo<string>(
    () => propertyDetails.photo
      ? propertyDetails.photo
      : '',
    [propertyDetails?.photo]
  );

  const imageName = useMemo<string>(
    () => propertyDetails?.title && propertyDetails?.title.includes(' ')
      ? `${propertyDetails?.title?.replace(' ', '_')}.${propertyDetails?.photo?.split('.').pop()}`
      : '',
    [propertyDetails?.photo, propertyDetails?.title]
  );

  const [propertyImage, setPropertyImage] = useState<PropertyImage>({
    url: imageUrl, 
    name: imageName,
  });

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit
  } = useForm();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorBox />;

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
      key: 'edit-select-img',
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
      type="Edit"
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

export default EditProperty;