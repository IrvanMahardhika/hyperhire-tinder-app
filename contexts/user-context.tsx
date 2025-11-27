import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { IUser } from "@/types/user";

const USERS: IUser[] = [
	{
		name: "Amber Heard",
		age: 39,
		description: "Actress",
		distance: 30,
		coverSrc: "https://static.tvtropes.org/pmwiki/pub/images/amberheard_2.jpg",
	},
	{
		name: "Mary Barra",
		age: 63,
		description: "General Motors CEO",
		distance: 10,
		coverSrc:
			"https://thewaltdisneycompany.com/app/uploads/2017/09/Mary-Barra-Headshot.jpg",
	},
	{
		name: "Jennifer Lawrence",
		age: 35,
		description: "Actress",
		distance: 35,
		coverSrc:
			"https://goldenglobes.com/wp-content/uploads/2023/10/Jennifer-Lawrence-Photo.png?w=600?w=600",
	},
	{
		name: "Sabrina Carpenter",
		age: 26,
		description: "Singer",
		distance: 50,
		coverSrc:
			"https://upload.wikimedia.org/wikipedia/commons/d/df/Sabrina_Carpenter_2019.jpg",
	},
	{
		name: "Katy Perry",
		age: 41,
		description: "Singer",
		distance: 15,
		coverSrc:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Katy_Perry_UNICEF_2012.jpg/500px-Katy_Perry_UNICEF_2012.jpg",
	},
];

type IUserContext = {
	users: IUser[];
	setUsers: Dispatch<SetStateAction<IUser[]>>;
	likedUsers: IUser[];
	setLikedUsers: Dispatch<SetStateAction<IUser[]>>;
	refreshUsers: () => void;
};

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [users, setUsers] = useState<IUser[]>(USERS);
	const [likedUsers, setLikedUsers] = useState<IUser[]>([]);

	const refreshUsers = () => {
		setUsers(USERS);
	};

	return (
		<UserContext.Provider
			value={{ users, setUsers, likedUsers, setLikedUsers, refreshUsers }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUsers = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
