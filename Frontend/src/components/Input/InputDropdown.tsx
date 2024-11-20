interface InputDropdownProps {
    data?: string[]
    click: (option: string) => void
}

export default function InputDropdown({ data, click }: InputDropdownProps) {
    const handleClick = async (item: string) => {
        const option = item.trim().replace(/[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/g, (c) => {
            const replacements: { [key: string]: string } = {
                'ą': 'a', 'Ą': 'Ą',
                'č': 'c', 'Č': 'C',
                'ę': 'e', 'Ę': 'E',
                'ė': 'e', 'Ė': 'E',
                'į': 'i', 'Į': 'I',
                'š': 's', 'Š': 'S',
                'ų': 'u', 'Ų': 'U',
                'ū': 'u', 'Ū': 'U',
                'ž': 'z', 'Ž': 'Z',
            };
            return replacements[c] || c;
        });
    
        click(option);
    };

    return (
        <div 
            className="
                w-full rounded-md p-0.5
                bg-gradient-to-tr from-[#C29469] via-[#ccc5c3] to-[#C29469]
            "
        >
            <div 
                className="
                    w-full h-full rounded-md overflow-hidden
                    dark:bg-[#3b2d2b] bg-[#EFD8BF]
                "
            >
                    <ul className="flex flex-col divide-y p-1">
                        {
                            data && data.length ? data.map((item, index) => (
                                <li 
                                    key={index}
                                    className="
                                        w-full h-min py-1 px-3 bg-[#EFD8BF] hover:bg-[#F2CEA9] dark:bg-[#3b2d2b] dark:hover:bg-[#66564c] cursor-pointer my-0.5
                                    "
                                    onClick={() => handleClick(item)}
                                >
                                    <div
                                        className="bg-clip-text text-transparent
                                        bg-gradient-to-tr dark:from-[#C29469] dark:via-[#ccc5c3] dark:to-[#C29469] from-[#3b2d2b] via-[#66564c] to-[#3b2d2b]
                                        "
                                    >
                                        {item}
                                    </div>
                                </li>
                            ))
                            :
                            <h1 className="w-full py-1 px-3 dark:text-gray-400">Nothing to select here...</h1>
                        }
                    </ul>
                </div>
        </div>
    )
}