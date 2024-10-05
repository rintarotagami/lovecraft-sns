import Header from '@/app/(main)/home/_components/header';

const HomeTemplate = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default HomeTemplate;

