const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; 2023 LoveCraft. All rights reserved.</p>
                <nav className="mt-2">
                    <ul className="flex justify-center space-x-4">
                        <li><a href="#" className="hover:text-gray-300">プライバシーポリシー</a></li>
                        <li><a href="#" className="hover:text-gray-300">利用規約</a></li>
                        <li><a href="#" className="hover:text-gray-300">お問い合わせ</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
