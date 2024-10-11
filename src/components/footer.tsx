const Footer = () => {
    return (
        <footer className="bg-[#150c0E] text-[#E3BF84] pt-4 pb-10">
            <div className="container mx-auto text-center">
                <nav className="mt-2">
                    <ul className="flex justify-center space-x-4">
                        <li><a href="#" className="hover:text-yellow-400">プライバシーポリシー</a></li>
                        <li><a href="#" className="hover:text-yellow-400">利用規約</a></li>
                        <li><a href="#" className="hover:text-yellow-400">お問い合わせ</a></li>
                    </ul>
                </nav>
                <p className="text-sm mt-2">&copy; 2023 LoveCraft. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
