import JdHeader from "../../components/jd-creation/jd-header/jdHeader";
import JdMain from "../../components/jd-creation/jd-main/jDMain";
import Sidebar from "../../components/sidebar";

const jdCreation = () => {
    return (
        <div>
            <div className="flex">
                <div className="sidebar fixed">
                    <Sidebar page={"jdCreation"} />
                </div>
                <div className="main w-full ms-16">
                    <div>
                        <JdHeader />
                    </div>
                    <div>
                        <JdMain />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default jdCreation;