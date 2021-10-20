import React from 'react';
import logo from '../assets/img/ga.png';

function PageHeader() {
    return (
        <div>
            <div className="hcContentContainer bgColorBrand1 hcMarginBottom1">
                <header className=" hcPageHeaderSimple hcBasicSideMargin">
                    <div className="hcBrand">
                        <div className="hcBrandLogo">
                            <img src={logo} className="galogo"/>
                        </div>
                    </div>

                    <nav>
                        <a href="">About</a>
                    </nav>
                </header>
            </div>

        </div>
    )
}

export default PageHeader;