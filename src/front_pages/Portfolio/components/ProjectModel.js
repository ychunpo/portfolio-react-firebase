import React from 'react';
import { Link as ReachLink } from "react-router-dom";
import {
  AspectRatio, Box, Button, Divider, Heading,
  ModalContent, ModalHeader, ModalBody, ModalFooter, ModalOverlay,
  ModalCloseButton, Link,
  Stack, HStack, Tag, TagLabel, Text,
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import ItemImagesSwiper from './ItemImagesSwiper';

const ProjectModel = ({ singleData, onClose, setSingleData }) => {
  const {
    title, videoUrl, use, description,
    websiteUrl, gitUrl, uiuxUrl, items
  } = singleData;

  const words = use.split(" ");

  const youtubeLoading = () => {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='1px'
      />
      <ModalContent>
        <ModalHeader color='#07789e' boxShadow='base'>
          <Heading size='xl' align='center'>{title}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {videoUrl && (
            <Box align='center'>
              <AspectRatio maxW='500px' ratio={4 / 3}>
                <iframe
                  onLoad={youtubeLoading}
                  title={title}
                  src={videoUrl}
                  allowFullScreen
                  loading="lazy"
                />
              </AspectRatio>
            </Box>
          )}
          <Box>
            <Stack
              m="10px auto"
              p={{ base: '0 3%', lg: '0 14%', md: '0 12%', sm: '0 10%', xs: '0 8%' }}>
              <Text
                fontSize={{ base: 'sm', lg: 'xl', md: 'lg', sm: 'lg', xs: 'md' }}
                as='b'
                color='blue.600'
              >
                Make use of
              </Text>
              <HStack spacing={2}>
                {
                  words.map((word) => {
                    return (
                      <Tag key={word} variant='solid' bgColor='#f4669a'>
                        <TagLabel
                          fontSize={{ base: 'md', lg: 'xl', md: 'lg', sm: 'lg', xs: 'md' }}
                        >
                          {word}
                        </TagLabel>
                      </Tag>
                    )
                  })
                }
              </HStack>
              <Divider />
              <Text
                fontSize={{ base: 'sm', lg: 'xl', md: 'lg', sm: 'lg', xs: 'md' }}
                as='b'
                color='blue.600'
              >
                Description
              </Text>
              <Text
                fontSize={{ base: 'md', lg: '2xl', md: 'xl', sm: 'xl', xs: 'lg' }}
              >
                {description}
              </Text>
              <Divider />
              <HStack spacing={10}>
                {websiteUrl && (
                  <>
                    <Link as={ReachLink} to={websiteUrl} >
                      <HStack alignContent="center">
                        <Text
                          fontSize={{ base: 'sm', xs: 'md' }}
                          as='b'
                          color='blue.600'
                        >
                          Webpage
                        </Text>
                        <LinkIcon mx='1px' />
                      </HStack>
                    </Link>
                  </>
                )}
                {gitUrl && (
                  <>
                    <Link as={ReachLink} to={gitUrl}>
                      <HStack alignContent="center">
                        <Text
                          fontSize={{ base: 'sm', xs: 'md' }}
                          as='b'
                          color='blue.600'
                        >
                          Code
                        </Text>
                        <LinkIcon mx='1px' />
                      </HStack>
                    </Link>
                  </>
                )}
                {uiuxUrl && (
                  <>
                    <Link as={ReachLink} to={uiuxUrl}>
                      <HStack alignContent="center">
                        <Text
                          fontSize={{ base: 'sm', xs: 'md' }}
                          as='b'
                          color='blue.600'
                        >
                          UI/UX
                        </Text>
                        <LinkIcon mx='1px' />
                      </HStack>
                    </Link>
                  </>
                )}
              </HStack>
              <Divider />
            </Stack>
            <ItemImagesSwiper items={items} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            fontSize='xl'
            colorScheme='blackAlpha'
            onClick={() => {
              onClose();
              setSingleData({});
            }}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default ProjectModel;