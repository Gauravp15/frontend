import React from 'react';

class Insta extends React.Component {

    render() {
        let {
            instaImg,
            linkOut
        } = this.props;

        return (
            <a className="instaWrapper" href={linkOut} target="_blank" rel="noopener noreferrer" style={{backgroundImage: `url(${instaImg})`, backgroundSize: 'cover', backgroundPosition: 'center center'}}>
            </a>
        )
    }
}

export default Insta;