import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from "prop-types";


export default class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = createRef();

    this.state = {
      isLoading: true,
    };

    this.handleCanPlayThrough = this.handleCanPlayThrough.bind(this);
  }

  handleCanPlayThrough() {
    this.setState({
      isLoading: false,
    });
  }

  handlePlay() {
    this.setState({
      isLoading: false,
    });
  }

  handlePause() {
    this.setState({
      isLoading: false,
    });
  }

  componentDidMount() {
    const {src} = this.props;

    const audio = this._audioRef.current;

    audio.addEventListener(`canplaythrough`, this.handleCanPlayThrough);

    audio.src = src;
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;
    audio.removeEventListener(`canplaythrough`, this.handleCanPlayThrough);
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  render() {
    const {isLoading} = this.state;
    const {onPlayButtonClick, isPlaying} = this.props;

    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={onPlayButtonClick}
        />
        <div className="track__status">
          <audio
            ref={this._audioRef}
            autoPlay={isPlaying} // ********* проверить, надо ли оно здесь, похоже на дублирование
          />
        </div>
      </Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};
