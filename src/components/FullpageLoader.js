import React from 'react';
import lottie from 'lottie-web';
import { gsap } from 'gsap';
import logoLoader from '../static/logoLoader.json';

class FullpageLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnimationComplete: false
        }
        this.loader = React.createRef();
        this.loaderWrapper = React.createRef();
    }

    componentDidMount() {
        this.loaderAnim = lottie.loadAnimation({
            container: this.loader.current,
            animationData: logoLoader,
            autoplay: true,
            loop: false,
            renderer: 'svg',
        });

        this.loaderAnim.addEventListener('complete', () => {
            this.toggleAnimationState();
        });
    }

    componentWillUnmount() {
        this.loaderAnim.destroy();
    }

    toggleAnimationState = () => {
        this.setState({
            isAnimationComplete: true
        }, async () => {
            await gsap.fromTo(this.loaderWrapper.current, {
                autoAlpha: 1,
                x: '0%'
            }, {
                duration: 1.5,
                x: '100%',
                ease: 'slow'
            });
            await this.props.toggleLoader(false);
        });
    }

    render() {
        return (
            <div className="loaderWrapper" ref={this.loaderWrapper}>
                <div className="loader" ref={this.loader} />
            </div>
        )
    }
}

export default FullpageLoader;