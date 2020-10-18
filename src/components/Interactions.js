import React from 'react';
import {get} from 'lodash-es';

class Interactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            videoSrc: ""
        };
        this.video = React.createRef();
    }

    componentDidMount(){
        let {intImgH} = this.props;
        let videoDOM = new DOMParser();
        let videoSrc = get(videoDOM.parseFromString(intImgH, "text/html").getElementsByClassName('wp-block-video'), "0.children.0.attributes.1.value", "");
        //console.log( title, videoSrc);
        this.setState({
            videoSrc
        });
    }

    render() {
        let {
            intImg,
            linkOut,
        } = this.props;

        return (
            <a className="intWrapper" href={linkOut} target="_blank" rel="noopener noreferrer" onMouseEnter={() => { this.setState({ active: true }) }} onMouseLeave={() => { this.setState({ active: false }) }} style={{backgroundImage: `url(${intImg})`, backgroundSize: 'cover', backgroundPosition: 'center center'}}>
                <video data-keepplaying src={this.state.videoSrc} className={`dbVid ${this.state.active ? 'active' : ''}`} type="video/mp4" playsInline loop muted ref={this.video} autoPlay />
                {/* <img src={intImg} alt={title} /> */}
            </a>
        )
    }
}

export default Interactions;