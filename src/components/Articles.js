import React from 'react';
import Icon from './Icon';

class CaseStudy extends React.Component {

    setTitle = () => {
        let { title } = this.props;
        return { __html: title }
    }

    setDescription = () => {
        let { description } = this.props;
        return { __html: description }
    }

    render() {
        let {
            bgImg,
            linkOut,
            mode
        } = this.props;

        return (
            <div className="articlesWrapper">
                <div className="articleImg" style={{ backgroundImage: `url(${bgImg})`, backgroundPosition: 'center center', backgroundSize: 'cover' }}></div>
                <div className="descriptionBlock articlesBlock">
                    <div className="caseStudyTitleWrapper" dangerouslySetInnerHTML={this.setTitle()}></div>
                    <div className="caseStudyDescriptionWrapper articlesDescriptionWrapper" dangerouslySetInnerHTML={this.setDescription()}>
                    </div>
                    <a href={linkOut} className="articlesLinkout" target="_blank" rel="noopener noreferrer">
                        <span className={`linkIcon ${mode === "dark" ? "darkText" : ""}`}>
                            <Icon icon="arrow-right2" size={20} />
                        </span>
                    </a>
                </div>
            </div>
        )
    }
}

export default CaseStudy;