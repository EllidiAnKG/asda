import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';

interface Track {
  title: string;
  artist: string;
  image: string;
  src: string;
}

interface TrackInfo {
  title: string;
  artist: string;
  image: string;
}

const Home = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  const [trackInfo, setTrackInfo] = useState<TrackInfo>({
    title: '?',
    artist: '',
    image: ''
  });
  const audioRef = useRef<HTMLAudioElement>(null); // Добавляем тип к ref

  const playlist: Track[] = [
    {
      title: 'Трек 1',
      artist: 'Исполнитель 1',
      image: '/img/zxc.jpg',
      src: '/audio/track1.mp3' // Замените на свои пути к файлам
    },
    {
      title: 'Трек 2',
      artist: 'Исполнитель 2',
      image: '/img/zxc.jpg',
      src: '/audio/track2.mp3' 
    },
    {
      title: 'Трек 3',
      artist: 'Исполнитель 3',
      image: '/img/zxc.jpg',
      src: '/audio/track3.mp3' 
    },
    {
      title: 'Трек 4',
      artist: 'Исполнитель 4',
      image: '/img/zxc.jpg',
      src: '/audio/track4.mp3' 
    }
  ];

  useEffect(() => {
    if (audioRef.current) { // Проверяем, что аудио элемент доступен
      audioRef.current.addEventListener('ended', () => {
        nextTrack();
      });
    }
  }, []);

  const playTrack = (index: number) => {
    setCurrentTrack(index);
    setAudioSrc(playlist[index].src);
    setTrackInfo({
      title: playlist[index].title,
      artist: playlist[index].artist,
      image: playlist[index].image
    });
    if (!isPlaying) {
      if (audioRef.current) { // Проверяем доступность аудио элемента
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const playPause = () => {
    if (isPlaying) {
      if (audioRef.current) { // Проверяем доступность аудио элемента
        audioRef.current.pause();
      }
    } else {
      if (audioRef.current) { // Проверяем доступность аудио элемента
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const prevTrack = () => {
    let newIndex = currentTrack - 1;
    if (newIndex < 0) {
      newIndex = playlist.length - 1;
    }
    playTrack(newIndex);
  };

  const nextTrack = () => {
    let newIndex = currentTrack + 1;
    if (newIndex >= playlist.length) {
      newIndex = 0;
    }
    playTrack(newIndex);
  };

    const loadTrack = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        // reader.onload = (e) => {
        //     setAudioSrc(e.target.result as string);
        //     // Добавьте логику для получения информации о треке из загруженного файла
        // };
        reader.readAsDataURL(file);
        }
    };

  return (
    <div className={styles.container}>
      <Head>
        <title>DeadSongs</title>
        <link rel="stylesheet" href={styles.globalCss} />
      </Head>

      <header className={styles.header}>
        <h1>DeadSongs</h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.playlist}>
          <h2>Мои треки</h2>
          <div className={styles.playlistContainer}>
            {playlist.map((track, index) => (
              <div
                key={index}
                className={styles.playlistItem}
                onClick={() => playTrack(index)}
              >
                <img src={track.image} alt="Трек" className={styles.trackImage} />
                <h3>{track.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.nowPlaying}>
          <h2>Сейчас играет</h2>
          <div className={styles.songInfo}>
            <img
              id="nowPlayingImage"
              src={trackInfo.image}
              alt="Обложка песни"
            />
            <div className={styles.info}>
              <h3 id="nowPlayingTitle">{trackInfo.title}</h3>
              <p id="nowPlayingArtist">{trackInfo.artist}</p>
            </div>
          </div>
        </section>

        <div className={styles.controls}>
          <button id="uploadButton" onClick={() => document.getElementById('fileInput')?.click()}>
            <img src="/img/qwe.jpg" alt="Загрузить" />
          </button>
          <input
            type="file"
            id="fileInput"
            accept="audio/*"
            style={{ display: 'none' }}
            onChange={loadTrack}
          />
          <button id="prevButton" onClick={prevTrack}>
            <img src="/img/icons8-начать-64.png" alt="Previous" />
          </button>
          <button id="playPauseButton" onClick={playPause}>
            <img src={isPlaying ? '/img/icons8-пауза-50.png' : '/img/icons8-воспроизведение-50.png'} alt="Play/Pause" />
          </button>
          <button id="nextButton" onClick={nextTrack}>
            <img src="/img/icons8-до-конца-64.png" alt="Next" />
          </button>
        </div>

        <audio id="audio-player" ref={audioRef} src={audioSrc} hidden></audio>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 DeadSongs</p>
      </footer>
    </div>
  );
};

export default Home;
