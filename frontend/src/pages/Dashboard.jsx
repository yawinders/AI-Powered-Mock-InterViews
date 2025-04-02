import React, { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text, Flex, Divider, Stack, useToast, ButtonGroup } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../context/Sessions'
import { BellIcon, HamburgerIcon } from '@chakra-ui/icons'
import Drawers from '../components/Drawers'
import ButtonComp from '../miscellaneous/ButtonComp'
const Dashboard = () => {

    const { tech, setTech, upComingSession, setUpComingSession, sessionType, setSessionType, notifications, joinDisabled, setJoinDisabled, previousSession } = useSession()
    const navigate = useNavigate()
    const toast = useToast()
    const handleContinue = () => {
        if (tech === undefined) {
            toast({
                title: '',
                description: "⚠️ Choose a Session to continue",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return
        }
        navigate('/slot-booking', { state: { tech } })

    }

    const handleSessionType = (e) => {
        // console.log(e);
        setSessionType(e)
        if (upComingSession.length > 0) { }
        else {

        }

    }
    const handleCancelSession = (data, idx) => {
        if (confirm("Please Confirm the Deletion of session")) {
            const copyUpcomingSession = [...upComingSession];
            copyUpcomingSession.splice(idx, 1);
            setUpComingSession(copyUpcomingSession);

        }

    }
    const handleJoinSession = (data, idx) => {
        // console.log("hii")
        navigate('/interview', { state: { data } })
    }
    return (
        <Box display="flex" w="100vw" height="100vh" >
            <Box m={30} p={2} w="20%" borderRight="2px solid lightgray" bgColor="#f5f7fe" display={{ lg: "flex", base: "none", sm: "none" }} flexDir={'column'} justifyContent="center" alignItems="start" gap={2}>

                <Avatar size="lg" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />

                <Drawers />
            </Box>
            <Box m={30} bg="white" w={{ lg: "60%", base: "100%" }} borderRadius="lg" borderWidth="1px">
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList
                        w="100%"
                        display={'flex'}
                        justifyContent={'center'}
                    >
                        <Tab _selected={{ color: 'white', bg: 'blue.500' }} w="50%">Session</Tab>
                        <Tab _selected={{ color: 'white', bg: 'green.400' }} w="50%">Session History</Tab>

                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Flex alignItems={'center'} gap={5} mb={10}>
                                <Avatar size="lg" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                                <Text>Name</Text>
                            </Flex>
                            <Divider />
                            <Box>
                                <Text align={'left'} fontSize="2xl">Book a Session (Available Session-♾️)</Text>
                            </Box>
                            <Box >
                                <RadioGroup onChange={setTech} value={tech}>
                                    <Stack direction='column' >
                                        {['React', 'JavaScript', 'Java', 'DSA Coding Round'].map((val, idx) =>
                                            <Box
                                                key={idx}
                                                w="100%"
                                                display="flex"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                p={3}
                                                gap={5}
                                                border="1px solid lightGray"
                                                borderRadius="md"
                                            >
                                                <Radio size="lg" colorScheme="orange" value={val} />
                                                <Box flex="1" display="flex" justifyContent="space-between" alignItems={'center'}>
                                                    <Text fontSize="2xl">{val}</Text>
                                                    <UnorderedList w="40%" >
                                                        <ListItem textAlign="left" fontSize="medium" color="gray.500">Lorem ipsum dolor sit amet</ListItem>
                                                        <ListItem textAlign="left" fontSize="medium" color="gray.500">Consectetur adipiscing elit</ListItem>
                                                    </UnorderedList>
                                                </Box>
                                            </Box>

                                        )

                                        }


                                    </Stack>
                                </RadioGroup>

                            </Box>
                            <Box display='flex' justifyContent="flex-end" mt={10}>
                                <Button colorScheme='orange' onClick={() => handleContinue()}>Continue➡️</Button>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Flex alignItems={'center'} gap={5} mb={10}>
                                <Avatar size="lg" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                                <Text>Name</Text>
                            </Flex>
                            <Divider />
                            <RadioGroup
                                mt={3}
                                mb={5}
                                onChange={handleSessionType}
                                value={sessionType}
                            >
                                <Stack direction='row'>
                                    <Text fontSize="md">Show:</Text>
                                    <Radio value='Upcoming Session'>Upcoming Session</Radio>
                                    <Radio value='Previous Session'>Previous Session</Radio>
                                    <Radio value='Cancelled Session'>Cancelled Session</Radio>
                                </Stack>
                            </RadioGroup>
                            <Divider />
                            <TableContainer>
                                <Table variant='striped' colorScheme='teal' size='sm'>
                                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                                    {sessionType === "Upcoming Session" && (
                                        <>
                                            <Thead>
                                                <Tr>
                                                    <Th>Session Type</Th>
                                                    <Th>Date & Time</Th>
                                                    <Th>Level</Th>
                                                    <Th>Mentor</Th>
                                                    <Th isNumeric>Actions</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {(upComingSession.length > 0) ? (upComingSession?.map((data, idx) => {
                                                    return <Tr key={idx}>
                                                        <Td>{data.tech}</Td>

                                                        <Td>{data.date} {data.time} {data.ampm}</Td>
                                                        <Td>{data.level}</Td>
                                                        <Td>AI</Td>
                                                        <Td isNumeric> <ButtonGroup gap='4'>
                                                            <ButtonComp handleJoinSession={() => handleJoinSession(data, idx)} data={data} index={idx} />
                                                            <Button colorScheme='blackAlpha' size='xs' onClick={() => handleCancelSession(data, idx)}>Cancel</Button>
                                                        </ButtonGroup></Td>
                                                    </Tr>
                                                })) : (<Text fontSize="md">You Have No Upcoming Session:</Text>)}


                                            </Tbody>
                                        </>

                                    )}
                                    {sessionType === "Previous Session" && (
                                        <>
                                            <Thead>
                                                <Tr>
                                                    <Th>Session Type</Th>
                                                    <Th>Date & Time</Th>
                                                    <Th>Level</Th>
                                                    <Th>Mentor</Th>
                                                    <Th isNumeric>Report</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {(previousSession.length > 0) ? (previousSession?.map((data, idx) => {
                                                    return <Tr key={idx}>
                                                        <Td>{data.tech}</Td>

                                                        <Td>{data.date} {data.time} {data.ampm}</Td>
                                                        <Td>{data.level}</Td>
                                                        <Td>AI</Td>
                                                        <Td isNumeric> <ButtonGroup gap='4'>
                                                            <ButtonComp handleJoinSession={() => handleJoinSession(data, idx)} data={data} index={idx} />
                                                            <Button colorScheme='blackAlpha' size='xs' onClick={() => handleCancelSession(data, idx)}>Cancel</Button>
                                                        </ButtonGroup></Td>
                                                    </Tr>
                                                })) : (<Text fontSize="md">You Have No Previus Session:</Text>)}


                                            </Tbody>
                                        </>

                                    )}


                                    {/* <Tfoot>
                                    <Tr>
                                        <Th>To convert</Th>
                                        <Th>into</Th>
                                        <Th isNumeric>multiply by</Th>
                                    </Tr>
                                </Tfoot> */}
                                </Table>
                            </TableContainer>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    )
}

export default Dashboard