import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
//import { yupResolver } from "@hookform/resolvers/yup";
import { collection, addDoc } from 'firebase/firestore';
import styled from 'styled-components';
import {
  Button, Box, Checkbox, FormControl, FormLabel, FormErrorMessage,
  Heading, Input, HStack, Textarea, Divider
} from '@chakra-ui/react';

import { db } from '../../../utils/firebase';
import { projectLabels } from '../../../data/projectLabels';
import { projectDefaultValue } from '../../../data/dataDefaultValue';
//import { projectSchema } from '../../../data/inputDataValidator';
import ItemsPartIWU from './components/ItemsPartIWU';

const APIWUContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 80%;
  font-family: "Poppins", sans-serif;
`

const AdminProjectCreate = () => {
  const navigation = useNavigate();
  const [projectData, setProjectData] = useState(projectDefaultValue);
  //console.log('G - projectData: ', projectData);

  const {
    register, control, getValues, setValue,
    handleSubmit, reset, formState: { errors }
  } = useForm({
    //resolver: yupResolver(projectSchema),
    // defaultValues: {
    //   test: [{}]
    // },
    projectDefaultValue
  });

  const dataUpdate = (data) => {
    setProjectData({
      rank: data.rank,
      title: data.title,
      use: data.use,
      description: data.description,
      websiteUrl: data.websiteUrl,
      videoUrl: data.videoUrl,
      gitUrl: data.gitUrl,
      uiuxUrl: data.uiuxUrl,
      coverCaption: data.coverCaption,
      coverImageFilename: data.coverImageFilename,
      coverImagePath: data.coverImagePath,
      items: data.items,
      hide: false,
    })
  }
  //

  // storeFirebase--->
  const storeFireStore = async (data) => {
    const projectRef = collection(db, "Projects");
    await addDoc(projectRef, data).then(() => {
      toast("Successfully", { type: "success" });
      //setProgress(0);
    }).catch((err) => {
      toast("Error adding", { type: "error" });
    });
  }

  // save with fireStore
  const onSubmit = (data) => {
    dataUpdate(data);
    storeFireStore(data);
    console.log('Create ok');
    navigation('/admin/projects')
  }

  return (
    <APIWUContainer>
      <Box p='0 30px' bgColor='rgb(245, 205, 245)'>
        <Heading
          p="12px 0"
          fontSize='3xl'
          align="center"
          color="green.800"
        >
          Create Project
        </Heading>
        <Divider pb={2} borderColor='grey' />
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Heading
              pt={1}
              fontSize='2xl'
              align='center'
              color='purple.600'
            >
              Info
            </Heading>
            {projectLabels.map((item) => {
              const { id, name, title, type, require } = item;
              return (
                <Box key={id} p='2px 0'>
                  <FormControl size='lg'>
                    <FormLabel
                      m='auto'
                      p='0 3px'
                      htmlFor={name}
                    >
                      {title}
                    </FormLabel>
                    <Input
                      fontSize='1.2rem'
                      bg='white'
                      {...register(name, { required: require })}
                      type={type}
                    />
                    <FormErrorMessage>

                    </FormErrorMessage>
                  </FormControl>
                </Box>
              )
            })}
            <Box>
              <FormControl>
                <FormLabel
                  m='auto'
                  p='0 3px'
                  htmlFor="description"
                >
                  Description
                </FormLabel>
                <Textarea
                  fontSize='1.2rem'
                  bg='white'
                  {...register("description")}
                />
              </FormControl>
            </Box>
            <Divider p={2} borderColor='grey' w='98%' />
            <Box>
              <Heading
                pt={1}
                fontSize='2xl'
                align='center'
                color='purple.600'
              >
                Cover
              </Heading>
              <Box>
                <FormControl size='lg'>
                  <FormLabel
                    m='auto'
                    p='0 3px'
                    htmlFor="coverImagePath"
                  >
                    Cover Image Path
                  </FormLabel>
                  <Textarea
                    fontSize='1.2rem'
                    bg='white'
                    {...register("coverImagePath")}
                    type="url"
                  />
                  <FormErrorMessage>

                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel
                    m="auto"
                    p='0 3px'
                    htmlFor="coverCaption"
                  >
                    Cover Caption
                  </FormLabel>
                  <Input
                    fontSize='1.2rem'
                    bg='white'
                    {...register("coverCaption")}
                    type="text"
                  />
                  <FormErrorMessage>

                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel
                    m="auto"
                    p='0 3px'
                    htmlFor="coverImageFilename"
                  >
                    Cover Image Filename
                  </FormLabel>
                  <Input
                    fontSize='1.2rem'
                    bg='white'
                    {...register("coverImageFilename")}
                    type="text"
                  />
                  <FormErrorMessage>

                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Divider p={2} borderColor='grey' w='98%' />
              <Heading
                pt={1}
                fontSize='2xl'
                align='center'
                color='purple.600'
              >
                Items
              </Heading>
              <Box>
                <ItemsPartIWU
                  {...{ control, register, getValues, setValue, errors, projectDefaultValue }}
                />
              </Box>
              <Checkbox
                size='lg'
                colorScheme='orange'
                {...register("hide", { disabled: false })}
              >
                Hide
              </Checkbox>
            </Box>
            <Divider p={2} borderColor='grey' w='98%' />
            <HStack p='40px 16px 16px 0' justify='center' spacing='150px'>
              <Button
                size='lg'
                colorScheme='orange'
                onClick={() => navigation('/admin/projects')}
              >
                Cancel
              </Button>
              <Button
                type='button'
                size='lg'
                colorScheme='red'
                onClick={() => reset(projectDefaultValue)}>
                Reset
              </Button>
              <Button
                size='lg'
                colorScheme='blue'
                type="submit"
              >
                Save
              </Button>
            </HStack>
          </form>
        </Box>
        <br />
      </Box>
    </APIWUContainer>
  )
}

export default AdminProjectCreate;