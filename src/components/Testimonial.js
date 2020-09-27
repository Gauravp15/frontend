import React from 'react';

class Testimonial extends React.Component {

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
            authorName,
            authorImg,
            authorPosition,
            authorCompany,
            mode
        } = this.props;

        return (
            <div className="testiWrapper">
                <div className="testiDescriptionBlock">
                    <div className="testiTitleWrapper" dangerouslySetInnerHTML={this.setTitle()}></div>
                    <div className="testiDescriptionWrapper" dangerouslySetInnerHTML={this.setDescription()}>
                    </div>
                    <div className="authorDetailsWrapper">
                        <div className="authorImg">
                            <img src={authorImg} alt={authorName} />
                        </div>
                        <div className="authorDetails">
                            <p className={`authorName ${mode === 'dark' ? 'darkText' : ''}`}>{authorName}</p>
                            <p className={`authorPos ${mode === 'dark' ? 'darkText' : ''}`}>{authorPosition}</p>
                            <p className={`authorCompany ${mode === 'dark' ? 'darkText' : ''}`}>{authorCompany}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Testimonial;