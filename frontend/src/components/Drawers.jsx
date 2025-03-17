import React, { useEffect } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Text,
} from '@chakra-ui/react'
import { BellIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useSession } from '../context/Sessions'
const Drawers = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = React.useState('left')
    const { showNotification, sessionType, tech, userDateTime, notifications } = useSession();
    // console.log(notifications);

    useEffect(() => {
        const tid = setInterval(() => {


        }, 10000)

        return () => {
            clearInterval(tid)
        }
    }, [showNotification])


    return (
        <>
            <Button colorScheme='blue' onClick={onOpen}>
                <BellIcon />
                <HamburgerIcon />
            </Button>
            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Notifications</DrawerHeader>
                    <DrawerBody>
                        {notifications.length > 0 ? notifications.map((ele, i) => <Text key={i} fontSize="md">{ele}</Text>) : "You Do not have any New Notifications"}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Drawers