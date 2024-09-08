const JdHeader = () => {
    return (
        <div className="header flex justify-between m-8">
            <div className="heading" style={{ fontSize: "25px", fontWeight: "bold" }}>
            Create New Job
            </div>
            <div className="flex gap-3">
                <div className="prifle cursor-pointer card border w-12 py-3 bg-white items-center self-center rounded-md">
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8164 6.16199V9.27924" stroke="black" stroke-width="1.40417" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M11.8349 2.00562C8.39005 2.00562 5.60044 4.79523 5.60044 8.24011V10.2059C5.60044 10.8425 5.33833 11.7973 5.01069 12.3403L3.82183 14.3248C3.09167 15.5511 3.59717 16.9179 4.94517 17.3672C9.41978 18.8556 14.2595 18.8556 18.7341 17.3672C19.9978 16.9459 20.5408 15.4669 19.8574 14.3248L18.6686 12.3403C18.3409 11.7973 18.0788 10.8331 18.0788 10.2059V8.24011C18.0694 4.81395 15.2611 2.00562 11.8349 2.00562Z" stroke="black" stroke-width="1.40417" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M14.9337 17.751C14.9337 19.4641 13.5296 20.8683 11.8165 20.8683C10.9646 20.8683 10.1783 20.5126 9.61661 19.9509C9.05494 19.3892 8.69922 18.6029 8.69922 17.751" stroke="black" stroke-width="1.40417" stroke-miterlimit="10"/>
</svg>


                </div>
                <div className="prifle cursor-pointer card border w-12 rounded-md" style={{
                    backgroundImage: `url(${require('../../../assets/imgs/profile.png')})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center'
                }}>
                        

                </div>

            </div>
        </div>
    );
};
export default JdHeader;