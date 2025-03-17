import React, { useState } from 'react'

import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text, Flex, Divider, Stack, Button, Select, Input } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSession } from '../context/Sessions'
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react'
import Drawers from '../components/Drawers'
const SlotBooking = () => {
    const [bookDisabled, setBookDisabled] = useState(true)
    const { level, setLevel, handleSlotBooking } = useSession()
    const [dateTime, setDateTime] = useState("");
    const location = useLocation();
    const tech = location?.state?.tech;
    const navigate = useNavigate()
    // console.log(tech)
    return (
        <Box display="flex" w="100vw" height="100vh" >
            <Box m={30} p={2} w="20%" borderRight="2px solid lightgray" bgColor="#f5f7fe" display={{ lg: "flex", base: "none", sm: "none" }} flexDir={'column'} justifyContent="center" alignItems="start" gap={2}>

                <Avatar size="lg" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />

                <Drawers />
            </Box>
            <Box m={30} w={{ lg: "60%", base: "100%" }}>
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <Box display="flex" justifyContent="flex-start" mb={10}>
                        <ArrowBackIcon onClick={() => {
                            setLevel("")
                            return navigate('/')
                        }} cursor="pointer" />

                    </Box>
                    <TabList
                        w="100%"
                        display={'flex'}
                        justifyContent={'center'}
                    >
                        {/* <Tab _selected={{ color: 'white', bg: 'blue.500' }} w="50%">Session</Tab> */}
                        <Tab _selected={{ color: 'white', bg: 'green.400' }} w="100%">Book a Session for {tech} AI Mock Interview</Tab>

                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Flex alignItems={'center'} gap={5} mb={10}>
                                <Avatar size="lg" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                                <Text>Name</Text>
                            </Flex>
                            <Divider />
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Text align={'left'} fontSize="2xl">Select Interview Round Level</Text>

                            </Box>
                            <Box w="100%" display="flex" justifyContent="space-between" gap={5} flexWrap="wrap">
                                <Box w={{ lg: "40%", base: "100%", sm: "100%", md: "49%", }} >
                                    <Select w="100%" placeholder='Easy Medium Difficult' onChange={(e) => setLevel(e.target.value)}>
                                        <option value='Easy'>Easy</option>
                                        <option value='Medium'>Medium</option>
                                        <option value='Difficult'>Difficult</option>
                                    </Select>

                                    {level &&
                                        <Box w={"100%"}>
                                            {level && <Text align={'left'} fontSize="2xl">Select Session Slot</Text>}
                                            <Input
                                                type="datetime-local"
                                                value={dateTime}
                                                onChange={(e) => {
                                                    setBookDisabled(false)
                                                    setDateTime(e.target.value)
                                                }

                                                }
                                            />
                                        </Box>

                                    }
                                </Box>
                                {level && <Box w={{ lg: "50%", base: "100%", sm: "100%", md: "49%", }} border="10px solid lightgray" borderRadius="20px">
                                    <Text bgColor={"lightgray"} fontSize="medium">👉 <b>Please understand the Rules before the Interview</b></Text>
                                    <UnorderedList fontSize="medium" listStyleType="none" mt={2} align="left" m={5}>
                                        <ListItem>1️⃣ Open mic only when answering a query.</ListItem>
                                        <ListItem>2️⃣ Close mic immediately after finishing response.</ListItem>
                                        <ListItem>3️⃣ Avoid mid-answer mic activation; it causes issues.</ListItem>
                                        <ListItem>4️⃣ Think before speaking to ensure clear responses.</ListItem>
                                        <ListItem>5️⃣ Sit in a quiet place for accuracy.</ListItem>
                                        <ListItem>6️⃣ Maintain a steady pace; avoid rushed answers.</ListItem>
                                        <ListItem><b>⚠️ Important:</b>

                                            <b> Breaking the rules may lead to misinterpretation.
                                                Stay professional, concise, and on-topic.</b></ListItem>
                                    </UnorderedList>
                                </Box>}
                            </Box>
                            <Box display='flex' justifyContent="flex-end" mt={10}>
                                <Button colorScheme='orange' disabled={bookDisabled} onClick={() => handleSlotBooking(dateTime)}>Book Session➡️</Button>
                            </Box>
                        </TabPanel>

                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    )
}

export default SlotBooking