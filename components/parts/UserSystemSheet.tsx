import React, { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ADD_USERS_URL, USERS_URL } from '@/utils/constants';
import Cookies from 'js-cookie';
import { useToast } from '@/hooks/use-toast';

type UserSystemSheetProps = {
    buttonName: string,
    sheetTitle: string,
    sheetDescription: string,
};

const UserSystemSheet: React.FC<UserSystemSheetProps> = ({ buttonName, sheetTitle, sheetDescription }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { toast } = useToast();

    const addUser = async () => {

        const accessToken = Cookies.get('bearer')
        const response = await fetch(`${ADD_USERS_URL}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstname,
                last_name: lastname,
                email: email,
                username: username,
                password: password,
                confirm_password: confirmPassword,
            })
        })


        if (!response.ok) {
            alert('Failed to add user');
            toast({
                title: "Something went wrong",
                description: "Failed to add user, please try again later.",
            })
            return;
        }

        toast({
            title: "User added successfully",
            description: "User added successfully.",
        })

        setTimeout(function () {
            window.location.reload();
        }, 2000);

        setFirstname('');
        setLastname('');
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>
                    {buttonName}
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="firstname" className="text-left col-span-12">
                            Firstname
                        </Label>
                        <Input
                            id="firstname"
                            className="col-span-12"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="lastname" className="text-left col-span-12">
                            Lastname
                        </Label>
                        <Input
                            id="lastname"
                            className="col-span-12"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="email" className="text-left col-span-12">
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            className="col-span-12"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="username" className="text-left col-span-12">
                            Username
                        </Label>
                        <Input
                            id="username"
                            className="col-span-12"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="password" className="text-left col-span-12">
                            Password
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="col-span-12"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="confirm_password" className="text-left col-span-12">
                            Confirm Password
                        </Label>
                        <Input
                            type="password"
                            id="confirm_password"
                            placeholder="Confirm Password"
                            className="col-span-12"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4 mt-2">
                        <Button onClick={addUser} className="col-span-12">
                            Add User
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default UserSystemSheet;
