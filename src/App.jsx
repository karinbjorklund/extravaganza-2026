import { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

const ROOM_CODE = "eurovision-2026";
const STORAGE_KEY = `eurovision-local-progress-${ROOM_CODE}`;
const MODERATOR_CODE = import.meta.env.VITE_MODERATOR_CODE || "";

const songs = [
  {
    id: 1,
    semifinal: 1,
    runningOrder: 1,
    country: "Georgien",
    title: "On Replay",
    artist: "Bzikebi",
    flag: "🇬🇪",
    flagBg:
      "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(220,38,38,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/coh-lygCINY",
    youtubeUrl: "https://youtu.be/coh-lygCINY?si=-FNAEx-IxPzaPNO3",
  },
  {
    id: 2,
    semifinal: 1,
    runningOrder: 2,
    country: "Portugal",
    title: "Rosa",
    artist: "Bandidos do Cante",
    flag: "🇵🇹",
    flagBg:
      "linear-gradient(135deg, rgba(22,163,74,0.10), rgba(220,38,38,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/jyHaE6GqaaQ",
    youtubeUrl: "https://youtu.be/jyHaE6GqaaQ?si=xgLZS1T68V37pfIp",
  },
  {
    id: 3,
    semifinal: 1,
    runningOrder: 3,
    country: "Kroatien",
    title: "Andromeda",
    artist: "Lelek",
    flag: "🇭🇷",
    flagBg:
      "linear-gradient(135deg, rgba(220,38,38,0.08), rgba(255,255,255,0.05), rgba(37,99,235,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/OMCR-8gmgso",
    youtubeUrl: "https://youtu.be/OMCR-8gmgso?si=sC8QCUOWWZq6xDGF",
  },
  {
    id: 4,
    semifinal: 1,
    runningOrder: 4,
    country: "Sverige",
    title: "My System",
    artist: "Felicia",
    flag: "🇸🇪",
    flagBg:
      "linear-gradient(135deg, rgba(37,99,235,0.11), rgba(250,204,21,0.09))",
    youtubeEmbed: "https://www.youtube.com/embed/-7AB53ZNXpQ",
    youtubeUrl: "https://youtu.be/-7AB53ZNXpQ?si=iDcIXIG-dj_I13Sm",
  },
  {
    id: 5,
    semifinal: 1,
    runningOrder: 5,
    country: "Finland",
    title: "Liekinheitin",
    artist: "Linda Lampenius & Pete Parkkonen",
    flag: "🇫🇮",
    flagBg:
      "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(37,99,235,0.10))",
    youtubeEmbed: "https://www.youtube.com/embed/9bfwNIYb96Q",
    youtubeUrl: "https://youtu.be/9bfwNIYb96Q?si=5LNmNqfhDZcceFg-",
  },
  {
    id: 6,
    semifinal: 1,
    runningOrder: 6,
    country: "Moldavien",
    title: "Viva, Moldova",
    artist: "Satoshi",
    flag: "🇲🇩",
    flagBg:
      "linear-gradient(135deg, rgba(37,99,235,0.09), rgba(250,204,21,0.07), rgba(220,38,38,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/1JEmuzqob8c",
    youtubeUrl: "https://youtu.be/1JEmuzqob8c?si=ERUiCUPW8cbYvrn6",
  },
  {
    id: 7,
    semifinal: 1,
    runningOrder: 7,
    country: "Grekland",
    title: "Ferto",
    artist: "Akylas",
    flag: "🇬🇷",
    flagBg:
      "linear-gradient(135deg, rgba(37,99,235,0.10), rgba(255,255,255,0.06))",
    youtubeEmbed: "https://www.youtube.com/embed/j_tDJ77ntPE",
    youtubeUrl: "https://youtu.be/j_tDJ77ntPE?si=JDH6U6RzgD0dyEya",
  },
  {
    id: 8,
    semifinal: 1,
    runningOrder: 8,
    country: "Montenegro",
    title: "Nova zora",
    artist: "Tamara Živković",
    flag: "🇲🇪",
    flagBg:
      "linear-gradient(135deg, rgba(220,38,38,0.10), rgba(250,204,21,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/59hsYOMCQGY",
    youtubeUrl: "https://youtu.be/59hsYOMCQGY?si=whtwlMN2yqiUl-ad",
  },
  {
    id: 9,
    semifinal: 1,
    runningOrder: 9,
    country: "Estland",
    title: "Too Epic To Be True",
    artist: "Vanilla Ninja",
    flag: "🇪🇪",
    flagBg:
      "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(17,24,39,0.16), rgba(255,255,255,0.06))",
    youtubeEmbed: "https://www.youtube.com/embed/iXVguLuMwkI",
    youtubeUrl: "https://youtu.be/iXVguLuMwkI?si=GCof0d3AeUXmclkD",
  },
  {
    id: 10,
    semifinal: 1,
    runningOrder: 10,
    country: "San Marino",
    title: "Superstar",
    artist: "Senhit",
    flag: "🇸🇲",
    flagBg:
      "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(37,99,235,0.09))",
    youtubeEmbed: "https://www.youtube.com/embed/wOQe-fQSFxg",
    youtubeUrl: "https://youtu.be/wOQe-fQSFxg?si=gjwGaZ59uDRXAhC8",
  },
  {
    id: 11,
    semifinal: 1,
    runningOrder: 11,
    country: "Polen",
    title: "Pray",
    artist: "Alicja",
    flag: "🇵🇱",
    flagBg:
      "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(244,63,94,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/q78cnYIoF9Y",
    youtubeUrl: "https://youtu.be/q78cnYIoF9Y?si=A5Gz1EC3x-QMA5Pt",
  },
  {
    id: 12,
    semifinal: 1,
    runningOrder: 12,
    country: "Belgien",
    title: "Dancing on the Ice",
    artist: "Essyla",
    flag: "🇧🇪",
    flagBg:
      "linear-gradient(135deg, rgba(17,24,39,0.16), rgba(250,204,21,0.07), rgba(220,38,38,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/9sfI4g6DWTU",
    youtubeUrl: "https://youtu.be/9sfI4g6DWTU?si=DrpV-JJE6WOpFv2z",
  },
  {
    id: 13,
    semifinal: 1,
    runningOrder: 13,
    country: "Litauen",
    title: "Sólo quiero más",
    artist: "Lion Ceccah",
    flag: "🇱🇹",
    flagBg:
      "linear-gradient(135deg, rgba(250,204,21,0.08), rgba(22,163,74,0.08), rgba(220,38,38,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/nWwMMMVkwRU",
    youtubeUrl: "https://youtu.be/nWwMMMVkwRU?si=hZrWRHQpiCv4-I55",
  },
  {
    id: 14,
    semifinal: 1,
    runningOrder: 14,
    country: "Serbien",
    title: "Kraj mene",
    artist: "Lavina",
    flag: "🇷🇸",
    flagBg:
      "linear-gradient(135deg, rgba(220,38,38,0.08), rgba(37,99,235,0.08), rgba(255,255,255,0.05))",
    youtubeEmbed: "https://www.youtube.com/embed/FJTLKBOOE98",
    youtubeUrl: "https://youtu.be/FJTLKBOOE98?si=nO7Oyg6nUjI5HyFV",
  },
  {
    id: 15,
    semifinal: 1,
    runningOrder: 15,
    country: "Israel",
    title: "Michelle",
    artist: "Noam Bettan",
    flag: "🇮🇱",
    flagBg:
      "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(37,99,235,0.10))",
    youtubeEmbed: "https://www.youtube.com/embed/xWCnWSoG8nI",
    youtubeUrl: "https://youtu.be/xWCnWSoG8nI?si=KcYPJo79_WpDvKiG",
  },
  {
    id: 16,
    semifinal: 1,
    runningOrder: 16,
    country: "Tyskland",
    title: "Fire",
    artist: "Sarah Engels",
    flag: "🇩🇪",
    flagBg:
      "linear-gradient(135deg, rgba(17,24,39,0.16), rgba(220,38,38,0.08), rgba(250,204,21,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/cv0N_jCx-nA",
    youtubeUrl: "https://youtu.be/cv0N_jCx-nA?si=RiV_FG29Mk9PuWB6",
  },
  {
    id: 17,
    semifinal: 1,
    runningOrder: 17,
    country: "Italien",
    title: "Per sempre sì",
    artist: "Sal Da Vinci",
    flag: "🇮🇹",
    flagBg:
      "linear-gradient(135deg, rgba(22,163,74,0.09), rgba(255,255,255,0.06), rgba(220,38,38,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/kA7pS6kaTpg",
    youtubeUrl: "https://youtu.be/kA7pS6kaTpg?si=n-KP1-lVYmqfiAEQ",
  },
  {
    id: 18,
    semifinal: 2,
    runningOrder: 1,
    country: "Armenien",
    title: "Paloma Rumba",
    artist: "Simón",
    flag: "🇦🇲",
    flagBg:
      "linear-gradient(135deg, rgba(220,38,38,0.08), rgba(37,99,235,0.08), rgba(249,115,22,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/5EXoK-lgocw",
    youtubeUrl: "https://youtu.be/5EXoK-lgocw?si=2h1VICQ2LpaYIkaf",
  },
  {
    id: 19,
    semifinal: 2,
    runningOrder: 2,
    country: "Rumänien",
    title: "Choke Me",
    artist: "Alexandra Căpitănescu",
    flag: "🇷🇴",
    flagBg:
      "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(250,204,21,0.08), rgba(220,38,38,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/JrSl0sTX5W4",
    youtubeUrl: "https://youtu.be/JrSl0sTX5W4?si=5uJk5l7J4rDrkWkp",
  },
  {
    id: 20,
    semifinal: 2,
    runningOrder: 3,
    country: "Schweiz",
    title: "Alice",
    artist: "Veronica Fusaro",
    flag: "🇨🇭",
    flagBg:
      "linear-gradient(135deg, rgba(220,38,38,0.10), rgba(255,255,255,0.06))",
    youtubeEmbed: "https://www.youtube.com/embed/PfpYGAzW5dM",
    youtubeUrl: "https://youtu.be/PfpYGAzW5dM?si=8oBwyvM6YAhq5HRm",
  },
  {
    id: 21,
    semifinal: 2,
    runningOrder: 4,
    country: "Azerbadzjan",
    title: "Just Go",
    artist: "Jiva",
    flag: "🇦🇿",
    flagBg:
      "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(220,38,38,0.08), rgba(22,163,74,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/iMDBPe25JhM",
    youtubeUrl: "https://youtu.be/iMDBPe25JhM?si=2HXWjEK_kVFzwjiT",
  },
  {
    id: 22,
    semifinal: 2,
    runningOrder: 5,
    country: "Luxemburg",
    title: "Mother Nature",
    artist: "Eva Marija",
    flag: "🇱🇺",
    flagBg:
      "linear-gradient(135deg, rgba(220,38,38,0.08), rgba(255,255,255,0.05), rgba(37,99,235,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/DmVfJSRqgnI",
    youtubeUrl: "https://youtu.be/DmVfJSRqgnI?si=bSrmmnavAd9-d8_S",
  },
  {
    id: 23,
    semifinal: 2,
    runningOrder: 6,
    country: "Bulgarien",
    title: "Bangaranga",
    artist: "Dara",
    flag: "🇧🇬",
    flagBg:
      "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(22,163,74,0.08), rgba(220,38,38,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/_pkC9J6BPFY",
    youtubeUrl: "https://youtu.be/_pkC9J6BPFY?si=28qxlf2657QcLS7v",
  },
  {
    id: 24,
    semifinal: 2,
    runningOrder: 7,
    country: "Tjeckien",
    title: "Crossroads",
    artist: "Daniel Žižka",
    flag: "🇨🇿",
    flagBg:
      "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(255,255,255,0.05), rgba(220,38,38,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/6ea25aRGpLo",
    youtubeUrl: "https://youtu.be/6ea25aRGpLo?si=3BgktlcUSmt1fmPm",
  },
  {
    id: 25,
    semifinal: 2,
    runningOrder: 8,
    country: "Albanien",
    title: "Nân",
    artist: "Alis",
    flag: "🇦🇱",
    flagBg:
      "linear-gradient(135deg, rgba(220,38,38,0.10), rgba(17,24,39,0.14))",
    youtubeEmbed: "https://www.youtube.com/embed/-2cZ-Ba6ygg",
    youtubeUrl: "https://youtu.be/-2cZ-Ba6ygg?si=_iNhQv6VnPskBA6K",
  },
  {
    id: 26,
    semifinal: 2,
    runningOrder: 9,
    country: "Danmark",
    title: "Før vi går hjem",
    artist: "Søren Torpegaard Lund",
    flag: "🇩🇰",
    flagBg:
      "linear-gradient(135deg, rgba(220,38,38,0.10), rgba(255,255,255,0.06))",
    youtubeEmbed: "https://www.youtube.com/embed/xKzEP9dwoss",
    youtubeUrl: "https://youtu.be/xKzEP9dwoss?si=U26DWf5McfI1UdKF",
  },
  {
    id: 27,
    semifinal: 2,
    runningOrder: 10,
    country: "Cypern",
    title: "Jalla",
    artist: "Antigoni",
    flag: "🇨🇾",
    flagBg:
      "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(249,115,22,0.07))",
    youtubeEmbed: "https://www.youtube.com/embed/tttWoT9m5g4",
    youtubeUrl: "https://youtu.be/tttWoT9m5g4?si=N1oEXX9R2C4D0fY9",
  },
  {
    id: 28,
    semifinal: 2,
    runningOrder: 11,
    country: "Norge",
    title: "Ya ya ya",
    artist: "Jonas Lovv",
    flag: "🇳🇴",
    flagBg:
      "linear-gradient(135deg, rgba(220,38,38,0.08), rgba(255,255,255,0.05), rgba(37,99,235,0.09))",
    youtubeEmbed: "https://www.youtube.com/embed/MasllzWk_bQ",
    youtubeUrl: "https://youtu.be/MasllzWk_bQ?si=wQoGhth3pmaSdz8C",
  },
  {
    id: 29,
    semifinal: 2,
    runningOrder: 12,
    country: "Malta",
    title: "Bella",
    artist: "Aidan",
    flag: "🇲🇹",
    flagBg:
      "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(220,38,38,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/zpnUWz6NKMw",
    youtubeUrl: "https://youtu.be/zpnUWz6NKMw?si=sXMkmRCFSNBoU05f",
  },
  {
    id: 30,
    semifinal: 2,
    runningOrder: 13,
    country: "Australien",
    title: "Eclipse",
    artist: "Delta Goodrem",
    flag: "🇦🇺",
    flagBg:
      "linear-gradient(135deg, rgba(17,24,39,0.16), rgba(37,99,235,0.09), rgba(220,38,38,0.07))",
    youtubeEmbed: "https://www.youtube.com/embed/KsFY11nOQDo",
    youtubeUrl: "https://youtu.be/KsFY11nOQDo?si=YRWgoC_jkAaq1Z6m",
  },
  {
    id: 31,
    semifinal: 2,
    runningOrder: 14,
    country: "Ukraina",
    title: "Ridnym",
    artist: "Leléka",
    flag: "🇺🇦",
    flagBg:
      "linear-gradient(135deg, rgba(37,99,235,0.11), rgba(250,204,21,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/SoEXezpblAc",
    youtubeUrl: "https://youtu.be/SoEXezpblAc?si=GC9PlS20dk4UEtor",
  },
  {
    id: 32,
    semifinal: 2,
    runningOrder: 15,
    country: "Lettland",
    title: "Ēnā",
    artist: "Atvara",
    flag: "🇱🇻",
    flagBg:
      "linear-gradient(135deg, rgba(127,29,29,0.14), rgba(255,255,255,0.05))",
    youtubeEmbed: "https://www.youtube.com/embed/6C2ivaB5D00",
    youtubeUrl: "https://youtu.be/6C2ivaB5D00?si=rg2aeFaWRFBfBtQM",
  },
  {
    id: 33,
    semifinal: 2,
    runningOrder: 16,
    country: "Österrike",
    title: "Tanzschein",
    artist: "Cosmó",
    flag: "🇦🇹",
    flagBg:
      "linear-gradient(135deg, rgba(220,38,38,0.09), rgba(255,255,255,0.06))",
    youtubeEmbed: "https://www.youtube.com/embed/SPpL_ZuRTZY",
    youtubeUrl: "https://youtu.be/SPpL_ZuRTZY?si=qSl22ox4HMwX-0w4",
  },
  {
    id: 34,
    semifinal: 2,
    runningOrder: 17,
    country: "Frankrike",
    title: "Regarde",
    artist: "Monroe",
    flag: "🇫🇷",
    flagBg:
      "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(255,255,255,0.05), rgba(220,38,38,0.08))",
    youtubeEmbed: "https://www.youtube.com/embed/ujoCYrvvTYQ",
    youtubeUrl: "https://youtu.be/ujoCYrvvTYQ?si=6aI7ciYS9Gd2jwRX",
  },
  {
    id: 35,
    semifinal: 2,
    runningOrder: 18,
    country: "Storbritannien",
    title: "Eins, Zwei, Drei",
    artist: "Look Mum No Computer",
    flag: "🇬🇧",
    flagBg:
      "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(220,38,38,0.08), rgba(255,255,255,0.05))",
    youtubeEmbed: "https://www.youtube.com/embed/niMKvJ-Itq8",
    youtubeUrl: "https://youtu.be/niMKvJ-Itq8?si=odFAztrHcpxblGBh",
  },
];

function normalizeName(name) {
  return name.trim().toLocaleLowerCase("sv");
}

function getDefaultState() {
  return {
    name: "",
    started: false,
    finished: false,
    currentIndex: 0,
    ratings: {},
  };
}

function getSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();

    const parsed = JSON.parse(raw);

    return {
      name: parsed.name ?? "",
      started: parsed.started ?? false,
      finished: parsed.finished ?? false,
      currentIndex: parsed.currentIndex ?? 0,
      ratings: parsed.ratings ?? {},
    };
  } catch {
    return getDefaultState();
  }
}

function getVoteFromRatings(ratings, songId) {
  const saved = ratings[songId];
  if (!saved) {
    return { song: 0, show: 0, plusMinus: 0, total: 0 };
  }
  return saved;
}

function buildMyRows(ratings) {
  return songs.map((song) => {
    const savedVote = ratings[song.id];
    return {
      songId: song.id,
      runningOrder: song.runningOrder,
      semifinal: song.semifinal,
      country: song.country,
      title: song.title,
      artist: song.artist,
      flag: song.flag,
      flagBg: song.flagBg,
      youtubeUrl: song.youtubeUrl,
      songScore: savedVote?.song ?? "–",
      showScore: savedVote?.show ?? "–",
      plusMinus: savedVote?.plusMinus ?? "–",
      total: savedVote?.total ?? "–",
      saved: !!savedVote,
    };
  });
}

function getPlacementClass(index) {
  if (index === 0) return "ranking-card--gold";
  if (index === 1) return "ranking-card--silver";
  if (index === 2) return "ranking-card--bronze";
  return "";
}

function getPlacementTotalClass(index) {
  if (index === 0) return "ranking-total--gold";
  if (index === 1) return "ranking-total--silver";
  if (index === 2) return "ranking-total--bronze";
  return "";
}

function ScoreSelector({
  label,
  min,
  max,
  value,
  onChange,
  variant = "default",
}) {
  const values = [];
  for (let i = min; i <= max; i += 1) values.push(i);

  return (
    <div className="field">
      <div className="score-selector__header">
        <span className="field__label">{label}</span>
        <span
          className={`score-selector__value ${
            variant === "plusminus" ? "score-selector__value--plusminus" : ""
          }`}
        >
          {value > 0 && variant === "plusminus" ? `+${value}` : value}
        </span>
      </div>

      <div
        className={`score-selector ${
          variant === "plusminus" ? "score-selector--plusminus" : ""
        }`}
      >
        {values.map((option) => {
          const isActive = Number(value) === option;
          return (
            <button
              key={option}
              type="button"
              className={`score-dot ${isActive ? "score-dot--active" : ""} ${
                variant === "plusminus" ? "score-dot--plusminus" : ""
              }`}
              onClick={() => onChange(option)}
              aria-pressed={isActive}
            >
              <span className="score-dot__text">
                {option > 0 && variant === "plusminus" ? `+${option}` : option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const initialState = getSavedState();

  const [name, setName] = useState(initialState.name);
  const [started, setStarted] = useState(initialState.started);
  const [finished, setFinished] = useState(initialState.finished);
  const [currentIndex, setCurrentIndex] = useState(initialState.currentIndex);
  const [ratings, setRatings] = useState(initialState.ratings);

  const initialSongId =
    songs[initialState.currentIndex]?.id ?? songs[0]?.id ?? null;
  const initialVote = initialSongId
    ? getVoteFromRatings(initialState.ratings, initialSongId)
    : { song: 0, show: 0, plusMinus: 0, total: 0 };

  const [songScore, setSongScore] = useState(Number(initialVote.song));
  const [showScore, setShowScore] = useState(Number(initialVote.show));
  const [plusMinus, setPlusMinus] = useState(Number(initialVote.plusMinus));

  const [allVotes, setAllVotes] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [resultsRevealed, setResultsRevealed] = useState(false);
  const [roomSettingsLoaded, setRoomSettingsLoaded] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [detailsIndex, setDetailsIndex] = useState(0);
  const [deletingParticipant, setDeletingParticipant] = useState("");
  const [renamingParticipant, setRenamingParticipant] = useState("");
  const [newParticipantName, setNewParticipantName] = useState("");
  const [resultsView, setResultsView] = useState("mine");

  const [loadingBoard, setLoadingBoard] = useState(false);
  const [savingVote, setSavingVote] = useState(false);
  const [error, setError] = useState("");

  const currentSong = songs[currentIndex] ?? songs[0];
  const currentSavedVote = currentSong
    ? getVoteFromRatings(ratings, currentSong.id)
    : { song: 0, show: 0, plusMinus: 0, total: 0 };

  const total = useMemo(() => {
    return Number(songScore) + Number(showScore) + Number(plusMinus);
  }, [songScore, showScore, plusMinus]);

  const isDirty = useMemo(() => {
    return (
      Number(songScore) !== Number(currentSavedVote.song) ||
      Number(showScore) !== Number(currentSavedVote.show) ||
      Number(plusMinus) !== Number(currentSavedVote.plusMinus)
    );
  }, [songScore, showScore, plusMinus, currentSavedVote]);

  const allSongsSaved = useMemo(() => {
    return songs.every((song) => ratings[song.id]);
  }, [ratings]);

  const participantNames = useMemo(() => {
    return participants
      .map((p) => p.participant_name)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "sv"));
  }, [participants]);

  const myRows = useMemo(() => buildMyRows(ratings), [ratings]);

  const myRowsSorted = useMemo(() => {
    const rows = buildMyRows(ratings);

    return rows.sort((a, b) => {
      const totalA = typeof a.total === "number" ? a.total : -9999;
      const totalB = typeof b.total === "number" ? b.total : -9999;

      if (totalB !== totalA) return totalB - totalA;
      return a.runningOrder - b.runningOrder;
    });
  }, [ratings]);

  const aggregatedRows = useMemo(() => {
    const map = new Map();

    songs.forEach((song) => {
      map.set(song.id, {
        songId: song.id,
        runningOrder: song.runningOrder,
        semifinal: song.semifinal,
        country: song.country,
        title: song.title,
        artist: song.artist,
        flag: song.flag,
        flagBg: song.flagBg,
        youtubeUrl: song.youtubeUrl,
        totalSong: 0,
        totalShow: 0,
        totalPlusMinus: 0,
        total: 0,
        voteCount: 0,
        average: 0,
      });
    });

    allVotes.forEach((vote) => {
      const row = map.get(vote.song_id);
      if (!row) return;

      row.totalSong += Number(vote.song_score);
      row.totalShow += Number(vote.show_score);
      row.totalPlusMinus += Number(vote.plusminus_score);
      row.total += Number(vote.total_score);
      row.voteCount += 1;
    });

    for (const row of map.values()) {
      row.average = row.voteCount > 0 ? row.total / row.voteCount : 0;
    }

    return [...map.values()].sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return a.runningOrder - b.runningOrder;
    });
  }, [allVotes]);

  const detailedCountries = useMemo(() => {
    return songs.map((song) => {
      const votesForSong = allVotes
        .filter((vote) => vote.song_id === song.id)
        .sort((a, b) =>
          a.participant_name.localeCompare(b.participant_name, "sv")
        );

      return {
        songId: song.id,
        runningOrder: song.runningOrder,
        semifinal: song.semifinal,
        country: song.country,
        title: song.title,
        artist: song.artist,
        flag: song.flag,
        flagBg: song.flagBg,
        youtubeUrl: song.youtubeUrl,
        votes: votesForSong,
      };
    });
  }, [allVotes]);

  const currentDetailedCountry =
    detailedCountries[detailsIndex] ?? detailedCountries[0];

  const sharedResultsVisible = roomSettingsLoaded && resultsRevealed === true;

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        name,
        started,
        finished,
        currentIndex,
        ratings,
      })
    );
  }, [name, started, finished, currentIndex, ratings]);

  useEffect(() => {
    if (!currentSong) return;
    const savedVote = getVoteFromRatings(ratings, currentSong.id);
    setSongScore(Number(savedVote.song));
    setShowScore(Number(savedVote.show));
    setPlusMinus(Number(savedVote.plusMinus));
  }, [currentIndex, ratings, currentSong]);

  useEffect(() => {
    if (detailsIndex > detailedCountries.length - 1) {
      setDetailsIndex(0);
    }
  }, [detailsIndex, detailedCountries.length]);

  useEffect(() => {
    if (!sharedResultsVisible) {
      setResultsView("mine");
    }
  }, [sharedResultsVisible]);

  useEffect(() => {
    fetchBoard();
    fetchParticipants();
    fetchRoomSettings();

    const channel = supabase
      .channel(`live-room-${ROOM_CODE}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "eurovision_votes",
          filter: `room_code=eq.${ROOM_CODE}`,
        },
        () => {
          fetchBoard();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "eurovision_participants",
          filter: `room_code=eq.${ROOM_CODE}`,
        },
        () => {
          fetchParticipants();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room_settings",
          filter: `room_code=eq.${ROOM_CODE}`,
        },
        () => {
          fetchRoomSettings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchBoard() {
    setLoadingBoard(true);
    setError("");

    const { data, error: boardError } = await supabase
      .from("eurovision_votes")
      .select("*")
      .eq("room_code", ROOM_CODE);

    if (boardError) {
      setError(boardError.message);
      setLoadingBoard(false);
      return;
    }

    setAllVotes(data || []);
    setLoadingBoard(false);
  }

  async function fetchParticipants() {
    const { data, error: participantsError } = await supabase
      .from("eurovision_participants")
      .select("*")
      .eq("room_code", ROOM_CODE);

    if (participantsError) {
      setError(participantsError.message);
      return;
    }

    setParticipants(data || []);
  }

  async function fetchRoomSettings() {
    setRoomSettingsLoaded(false);

    const { data, error: roomError } = await supabase
      .from("room_settings")
      .select("*")
      .eq("room_code", ROOM_CODE)
      .maybeSingle();

    if (roomError) {
      setError(roomError.message);
      setResultsRevealed(false);
      setRoomSettingsLoaded(true);
      return;
    }

    setResultsRevealed(!!data?.results_revealed);
    setRoomSettingsLoaded(true);
  }

  async function registerParticipant() {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Skriv in ditt namn först.");
      return false;
    }

    const normalized = normalizeName(trimmedName);
    const localState = getSavedState();
    const existingLocalName = localState.name
      ? normalizeName(localState.name)
      : "";

    if (
      existingLocalName === normalized &&
      (localState.started || localState.finished)
    ) {
      return true;
    }

    const { error: insertError } = await supabase
      .from("eurovision_participants")
      .insert({
        room_code: ROOM_CODE,
        participant_name: trimmedName,
        normalized_name: normalized,
      });

    if (insertError) {
      if (insertError.code === "23505") {
        setError("Det namnet används redan. Välj ett unikt namn.");
      } else {
        setError(insertError.message);
      }
      return false;
    }

    await fetchParticipants();
    return true;
  }

  async function startVoting() {
    setError("");
    const ok = await registerParticipant();
    if (!ok) return;

    setStarted(true);
    setFinished(false);
  }

  async function saveCurrentVote() {
    if (!currentSong || !name.trim()) return false;

    setSavingVote(true);
    setError("");

    const safeSong = Math.max(0, Math.min(5, Number(songScore)));
    const safeShow = Math.max(0, Math.min(5, Number(showScore)));
    const safePlusMinus = Math.max(-5, Math.min(5, Number(plusMinus)));
    const safeTotal = safeSong + safeShow + safePlusMinus;

    const updatedRatings = {
      ...ratings,
      [currentSong.id]: {
        country: currentSong.country,
        title: currentSong.title,
        artist: currentSong.artist,
        flag: currentSong.flag,
        flagBg: currentSong.flagBg,
        youtubeUrl: currentSong.youtubeUrl,
        song: safeSong,
        show: safeShow,
        plusMinus: safePlusMinus,
        total: safeTotal,
      },
    };

    const voteRow = {
      room_code: ROOM_CODE,
      participant_name: name.trim(),
      song_id: currentSong.id,
      country: currentSong.country,
      title: currentSong.title,
      artist: currentSong.artist,
      song_score: safeSong,
      show_score: safeShow,
      plusminus_score: safePlusMinus,
      total_score: safeTotal,
    };

    const { error: saveError } = await supabase
      .from("eurovision_votes")
      .upsert(voteRow, { onConflict: "room_code,participant_name,song_id" });

    if (saveError) {
      setError(saveError.message);
      setSavingVote(false);
      return false;
    }

    setRatings(updatedRatings);
    setSavingVote(false);
    return true;
  }

  async function saveIfNeeded() {
    if (!isDirty) return true;
    return await saveCurrentVote();
  }

  async function goToSong(index) {
    if (index < 0 || index > songs.length - 1) return;

    const ok = await saveIfNeeded();
    if (!ok) return;

    setStarted(true);
    setFinished(false);
    setCurrentIndex(index);
  }

  async function goNext() {
    const ok = await saveIfNeeded();
    if (!ok) return;

    if (currentIndex < songs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStarted(false);
      setFinished(true);
    }
  }

  async function goPrev() {
    if (currentIndex > 0) {
      await goToSong(currentIndex - 1);
    }
  }

  async function goToEndScreen() {
    const ok = await saveIfNeeded();
    if (!ok) return;

    setStarted(false);
    setFinished(true);
  }

  async function toggleReveal(nextValue) {
    if (!isModerator) return;

    const { error: revealError } = await supabase.from("room_settings").upsert(
      {
        room_code: ROOM_CODE,
        results_revealed: nextValue,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "room_code" }
    );

    if (revealError) {
      setError(revealError.message);
      return;
    }

    setResultsRevealed(nextValue);
  }

  async function deleteParticipantVotes(participantName) {
    if (!isModerator || !participantName) return;

    const confirmed = window.confirm(
      `Är du säker på att du vill radera alla röster från "${participantName}"? Detta går inte att ångra.`
    );

    if (!confirmed) return;

    setError("");

    const { error: voteError } = await supabase
      .from("eurovision_votes")
      .delete()
      .eq("room_code", ROOM_CODE)
      .eq("participant_name", participantName);

    if (voteError) {
      setError(voteError.message);
      return;
    }

    const { error: participantError } = await supabase
      .from("eurovision_participants")
      .delete()
      .eq("room_code", ROOM_CODE)
      .eq("participant_name", participantName);

    if (participantError) {
      setError(participantError.message);
      return;
    }

    if (name.trim() === participantName) {
      setRatings({});
      setCurrentIndex(0);
      setSongScore(0);
      setShowScore(0);
      setPlusMinus(0);
      setFinished(false);
      setStarted(false);
      localStorage.removeItem(STORAGE_KEY);
    }

    setDeletingParticipant("");
    await fetchBoard();
    await fetchParticipants();
  }

  async function clearAllVotes() {
    if (!isModerator) return;

    const confirmed = window.confirm(
      "Är du säker på att du vill radera alla röster och alla röstare i hela rummet? Detta går inte att ångra."
    );

    if (!confirmed) return;

    setError("");

    const { error: votesError } = await supabase
      .from("eurovision_votes")
      .delete()
      .eq("room_code", ROOM_CODE);

    if (votesError) {
      setError(votesError.message);
      return;
    }

    const { error: participantsError } = await supabase
      .from("eurovision_participants")
      .delete()
      .eq("room_code", ROOM_CODE);

    if (participantsError) {
      setError(participantsError.message);
      return;
    }

    const { error: settingsError } = await supabase
      .from("room_settings")
      .upsert(
        {
          room_code: ROOM_CODE,
          results_revealed: false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "room_code" }
      );

    if (settingsError) {
      setError(settingsError.message);
      return;
    }

    setAllVotes([]);
    setParticipants([]);
    setResultsRevealed(false);
    setDeletingParticipant("");
    setRenamingParticipant("");
    setNewParticipantName("");
    setDetailsIndex(0);
    setResultsView("mine");

    setRatings({});
    setCurrentIndex(0);
    setSongScore(0);
    setShowScore(0);
    setPlusMinus(0);
    setFinished(false);
    setStarted(false);

    localStorage.removeItem(STORAGE_KEY);

    await fetchBoard();
    await fetchParticipants();
    await fetchRoomSettings();
  }

  async function renameParticipant(oldName, newNameRaw) {
    if (!isModerator || !oldName) return;

    const trimmedNewName = newNameRaw.trim();

    if (!trimmedNewName) {
      setError("Skriv in ett nytt namn.");
      return;
    }

    if (oldName === trimmedNewName) {
      setError("Det nya namnet är samma som det gamla.");
      return;
    }

    setError("");

    const normalizedNewName = normalizeName(trimmedNewName);

    const confirmed = window.confirm(
      `Byt namn från "${oldName}" till "${trimmedNewName}"?`
    );

    if (!confirmed) return;

    const { error: participantError } = await supabase
      .from("eurovision_participants")
      .update({
        participant_name: trimmedNewName,
        normalized_name: normalizedNewName,
      })
      .eq("room_code", ROOM_CODE)
      .eq("participant_name", oldName);

    if (participantError) {
      if (participantError.code === "23505") {
        setError("Det nya namnet används redan. Välj ett unikt namn.");
      } else {
        setError(participantError.message);
      }
      return;
    }

    const { error: votesError } = await supabase
      .from("eurovision_votes")
      .update({
        participant_name: trimmedNewName,
      })
      .eq("room_code", ROOM_CODE)
      .eq("participant_name", oldName);

    if (votesError) {
      setError(votesError.message);
      return;
    }

    if (name.trim() === oldName) {
      setName(trimmedNewName);
    }

    setRenamingParticipant("");
    setNewParticipantName("");

    await fetchParticipants();
    await fetchBoard();
  }

  function unlockModerator() {
    if (!MODERATOR_CODE) {
      setIsModerator(true);
      return;
    }

    const answer = window.prompt("Ange moderator-kod");
    if (answer === MODERATOR_CODE) {
      setIsModerator(true);
    } else {
      window.alert("Fel kod.");
    }
  }

  if (!currentSong && songs.length === 0) {
    return (
      <div className="page">
        <main className="shell shell--narrow">
          <section className="panel">
            <div className="alert alert--notice">Inga bidrag är inlagda ännu.</div>
          </section>
        </main>
      </div>
    );
  }

  if (!started && !finished) {
    return (
      <div className="page">
        <main className="shell shell--narrow">
          <section className="panel hero">
            <p className="eyebrow">Eurovision Scoreboard</p>
            <h1 className="hero__title">
              Inför Eurovision Song Contest Extravaganza 2026
            </h1>
            <p className="hero__text">Skriv in ditt namn för att börja rösta.</p>

            {error && <div className="alert alert--error">{error}</div>}

            <input
              type="text"
              placeholder="Ditt namn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />

            <div className="actions">
              <button onClick={startVoting} className="btn btn--primary">
                Börja rösta
              </button>
              <button onClick={unlockModerator} className="btn btn--secondary">
                Moderatorläge
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="page">
        <main className="shell">
          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">Sammanställning</p>
                <h1 className="page-title">Dina röster</h1>
              </div>
            </div>

            <p className="body-text">
              Här ser du dina egna poäng. De gemensamma resultaten visas först
              när moderatorn släpper dem.
            </p>

            {error && <div className="alert alert--error">{error}</div>}

            <div className="actions">
              <button
                onClick={() => {
                  setFinished(false);
                  setStarted(true);
                }}
                className="btn btn--secondary"
              >
                Tillbaka till röstningen
              </button>

              {!isModerator && (
                <button
                  onClick={unlockModerator}
                  className="btn btn--secondary"
                >
                  Moderatorläge
                </button>
              )}
            </div>

            {isModerator && (
              <section className="moderator">
                <h2 className="moderator__title">Moderatorpanel</h2>

                <div className="actions">
                  <button
                    onClick={() => toggleReveal(true)}
                    className="btn btn--primary"
                  >
                    Visa gemensamt resultat
                  </button>
                  <button
                    onClick={() => toggleReveal(false)}
                    className="btn btn--secondary"
                  >
                    Dölj gemensamt resultat
                  </button>
                </div>

                <div className="moderator__block">
                  <h3 className="subheading">Rensa allt</h3>
                  <p className="small-text">
                    Raderar alla röster, alla röstare och låser resultaten igen.
                  </p>

                  <div className="actions">
                    <button
                      onClick={clearAllVotes}
                      className="btn btn--danger"
                    >
                      Rensa alla röster
                    </button>
                  </div>
                </div>

                <div className="moderator__block">
                  <h3 className="subheading">Byt namn på röstare</h3>
                  <p className="small-text">
                    Välj en röstare och skriv in ett nytt unikt namn.
                  </p>

                  <div className="actions">
                    <select
                      value={renamingParticipant}
                      onChange={(e) => setRenamingParticipant(e.target.value)}
                      className="input"
                    >
                      <option value="">Välj röstare</option>
                      {participantNames.map((participant) => (
                        <option key={participant} value={participant}>
                          {participant}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      value={newParticipantName}
                      onChange={(e) => setNewParticipantName(e.target.value)}
                      placeholder="Nytt namn"
                      className="input"
                    />

                    <button
                      onClick={() =>
                        renameParticipant(
                          renamingParticipant,
                          newParticipantName
                        )
                      }
                      className="btn btn--primary"
                      disabled={
                        !renamingParticipant || !newParticipantName.trim()
                      }
                    >
                      Byt namn
                    </button>
                  </div>
                </div>

                <div className="moderator__block">
                  <h3 className="subheading">Radera röstare</h3>
                  <p className="small-text">
                    Välj en röstare och radera alla deras poäng.
                  </p>

                  <div className="actions">
                    <select
                      value={deletingParticipant}
                      onChange={(e) => setDeletingParticipant(e.target.value)}
                      className="input"
                    >
                      <option value="">Välj röstare</option>
                      {participantNames.map((participant) => (
                        <option key={participant} value={participant}>
                          {participant}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => deleteParticipantVotes(deletingParticipant)}
                      className="btn btn--danger"
                      disabled={!deletingParticipant}
                    >
                      Radera röstare
                    </button>
                  </div>
                </div>
              </section>
            )}

            {!sharedResultsVisible ? (
              <section className="block">
                <h2 className="section-title">Din tabell</h2>
                <MyVotesList
                  rows={myRowsSorted}
                  onEdit={goToSong}
                  showPlacement={true}
                />

                <div className="alert alert--notice">
                  Gemensamma resultat är fortfarande dolda.
                </div>
              </section>
            ) : (
              <>
                <div className="results-switcher">
                  <button
                    onClick={() => setResultsView("mine")}
                    className={`switcher-btn ${
                      resultsView === "mine" ? "switcher-btn--active" : ""
                    }`}
                  >
                    Min tabell
                  </button>
                  <button
                    onClick={() => setResultsView("shared")}
                    className={`switcher-btn ${
                      resultsView === "shared" ? "switcher-btn--active" : ""
                    }`}
                  >
                    Gemensamt resultat
                  </button>
                </div>

                {resultsView === "mine" ? (
                  <section className="block">
                    <h2 className="section-title">Din tabell</h2>
                    <MyVotesList
                      rows={myRowsSorted}
                      onEdit={goToSong}
                      showPlacement={true}
                    />
                  </section>
                ) : (
                  <>
                    <section className="block">
                      <div className="section-header">
                        <h2 className="section-title">Gemensam tabell</h2>
                      </div>

                      <TotalsList rows={aggregatedRows} loading={loadingBoard} />
                    </section>

                    <section className="block">
                      <h2 className="section-title">Alla röster</h2>
                      <DetailedVotesCarousel
                        currentCountry={currentDetailedCountry}
                        detailsIndex={detailsIndex}
                        totalCountries={detailedCountries.length}
                        onPrev={() =>
                          setDetailsIndex((prev) => Math.max(0, prev - 1))
                        }
                        onNext={() =>
                          setDetailsIndex((prev) =>
                            Math.min(detailedCountries.length - 1, prev + 1)
                          )
                        }
                      />
                    </section>
                  </>
                )}
              </>
            )}
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <main className="shell">
        <section
          className="panel entry-card"
          style={{ "--flag-bg": currentSong.flagBg }}
        >
          <div className="entry-flag-wash" />
          <div className="entry-card-content">
            <header className="vote-header">
              <div className="vote-header__copy">
                <p className="eyebrow">
                  Semi {currentSong.semifinal} • Bidrag {currentIndex + 1} av{" "}
                  {songs.length}
                </p>
                <h1 className="page-title">
                  {currentSong.flag} #{currentSong.runningOrder} —{" "}
                  {currentSong.country}
                </h1>
                <p className="body-text body-text--strong">
                  <strong>{currentSong.title}</strong> – {currentSong.artist}
                </p>
                <a
                  href={currentSong.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-button link-button--spaced"
                >
                  Öppna på YouTube
                </a>
              </div>

              <div className="score-pill">
                <span className="score-pill__label">Total</span>
                <span className="score-pill__value">{total}</span>
              </div>
            </header>

            {error && <div className="alert alert--error">{error}</div>}

            <div className="video-wrap">
              <iframe
                className="video"
                src={currentSong.youtubeEmbed}
                title={currentSong.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="score-grid score-grid--selectors">
              <ScoreSelector
                label="Låt"
                min={0}
                max={5}
                value={songScore}
                onChange={setSongScore}
              />

              <ScoreSelector
                label="Show"
                min={0}
                max={5}
                value={showScore}
                onChange={setShowScore}
              />

              <ScoreSelector
                label="+/-"
                min={-5}
                max={5}
                value={plusMinus}
                onChange={setPlusMinus}
                variant="plusminus"
              />
            </div>

            <div className="status">
              <span
                className={`badge ${
                  savingVote ? "badge--warning" : "badge--success"
                }`}
              >
                {savingVote ? "Sparar..." : "Sparas automatiskt"}
              </span>
              <span className="small-text">
                Svar sparas när du byter bidrag eller går till slutsidan.
              </span>
            </div>

            <div className="actions">
              <button
                onClick={goPrev}
                className="btn btn--secondary"
                disabled={currentIndex === 0 || savingVote}
              >
                Föregående bidrag
              </button>

              <button
                onClick={goNext}
                className="btn btn--primary"
                disabled={savingVote}
              >
                {currentIndex === songs.length - 1
                  ? "Till slutskärmen"
                  : "Nästa bidrag"}
              </button>

              <button
                onClick={goToEndScreen}
                className="btn btn--secondary"
                disabled={savingVote}
              >
                Gå till slutsida
              </button>
            </div>

            {allSongsSaved && (
              <div className="alert alert--success">
                Alla bidrag är sparade. Du kan nu gå till slutskärmen.
              </div>
            )}

            <section className="block">
              <h2 className="section-title">Din tabell</h2>
              <MyVotesList rows={myRows} onEdit={goToSong} />
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

function MyVotesList({ rows, onEdit, showPlacement = false }) {
  return (
    <div className="card-list">
      {rows.map((row, index) => (
        <article
          key={row.songId}
          className="item-card entry-card"
          style={{ "--flag-bg": row.flagBg }}
        >
          <div className="entry-flag-wash" />
          <div className="entry-card-content">
            <div className="item-card__top">
              <div>
                <p className="mini">
                  {showPlacement
                    ? `#${index + 1} • Semi ${row.semifinal} • Startnr ${row.runningOrder}`
                    : `Semi ${row.semifinal} • Startnr ${row.runningOrder}`}
                </p>
                <button
                  className="link-button link-button--country"
                  onClick={() =>
                    onEdit(songs.findIndex((song) => song.id === row.songId))
                  }
                >
                  {row.flag} {row.country}
                </button>
              </div>

              <div
                className={`status-chip ${
                  row.saved ? "status-chip--saved" : "status-chip--unsaved"
                }`}
              >
                {row.saved ? "Sparat" : "Ej sparat"}
              </div>
            </div>

            <h3 className="item-title">{row.title}</h3>
            <p className="item-subtitle">{row.artist}</p>

            <a
              href={row.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="link-button"
            >
              Öppna på YouTube
            </a>

            <div className="compact-stats-row">
              <div className="compact-stat">
                <span className="compact-stat__label">Låt</span>
                <span className="compact-stat__value">{row.songScore}</span>
              </div>
              <div className="compact-stat">
                <span className="compact-stat__label">Show</span>
                <span className="compact-stat__value">{row.showScore}</span>
              </div>
              <div className="compact-stat">
                <span className="compact-stat__label">+/-</span>
                <span className="compact-stat__value">{row.plusMinus}</span>
              </div>
              <div className="compact-stat compact-stat--total">
                <span className="compact-stat__label">Total</span>
                <span className="compact-stat__value">{row.total}</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function TotalsList({ rows, loading }) {
  return (
    <div className="card-list">
      {loading && <p className="small-text">Uppdaterar live…</p>}

      {rows.map((row, index) => (
        <article
          key={row.songId}
          className={`item-card entry-card ${getPlacementClass(index)}`}
          style={{ "--flag-bg": row.flagBg }}
        >
          <div className="entry-flag-wash" />
          <div className="entry-card-content">
            <div className="item-card__top">
              <div>
                <p className="mini">
                  #{index + 1} • Semi {row.semifinal} • Startnr{" "}
                  {row.runningOrder}
                </p>
                <h3 className="item-title item-title--tight">
                  {row.flag} {row.country}
                </h3>
              </div>

              <div className={`item-total ${getPlacementTotalClass(index)}`}>
                {row.total}
              </div>
            </div>

            <p className="item-subtitle">
              {row.title} – {row.artist}
            </p>

            <a
              href={row.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="link-button"
            >
              Öppna på YouTube
            </a>

            <div className="compact-stats-row">
              <div className="compact-stat">
                <span className="compact-stat__label">Låt</span>
                <span className="compact-stat__value">{row.totalSong}</span>
              </div>

              <div className="compact-stat">
                <span className="compact-stat__label">Show</span>
                <span className="compact-stat__value">{row.totalShow}</span>
              </div>

              <div className="compact-stat">
                <span className="compact-stat__label">+/-</span>
                <span className="compact-stat__value">
                  {row.totalPlusMinus}
                </span>
              </div>

              <div className="compact-stat compact-stat--total">
                <span className="compact-stat__label">Snitt</span>
                <span className="compact-stat__value">
                  {row.voteCount > 0 ? row.average.toFixed(1) : "–"}
                </span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function DetailedVotesCarousel({
  currentCountry,
  detailsIndex,
  totalCountries,
  onPrev,
  onNext,
}) {
  if (!currentCountry) {
    return <div className="alert alert--notice">Inga röster ännu.</div>;
  }

  return (
    <div className="browser">
      <div className="browser__header">
        <button
          onClick={onPrev}
          className="btn btn--secondary"
          disabled={detailsIndex === 0}
        >
          Föregående land
        </button>

        <div className="browser__center">
          <h3 className="browser__country">
            {currentCountry.flag} #{currentCountry.runningOrder} —{" "}
            {currentCountry.country}
          </h3>
          <p className="browser__song">
            {currentCountry.title} – {currentCountry.artist}
          </p>
          <a
            href={currentCountry.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="link-button"
          >
            Öppna på YouTube
          </a>
          <p className="browser__count">
            Land {detailsIndex + 1} av {totalCountries}
          </p>
        </div>

        <button
          onClick={onNext}
          className="btn btn--secondary"
          disabled={detailsIndex === totalCountries - 1}
        >
          Nästa land
        </button>
      </div>

      <div className="card-list">
        {currentCountry.votes.length === 0 ? (
          <article
            className="item-card entry-card"
            style={{ "--flag-bg": currentCountry.flagBg }}
          >
            <div className="entry-flag-wash" />
            <div className="entry-card-content">
              <p className="small-text">Inga röster ännu för detta bidrag.</p>
            </div>
          </article>
        ) : (
          currentCountry.votes.map((row) => (
            <article
              key={`${row.song_id}-${row.participant_name}`}
              className="item-card entry-card"
              style={{ "--flag-bg": currentCountry.flagBg }}
            >
              <div className="entry-flag-wash" />
              <div className="entry-card-content">
                <div className="item-card__top">
                  <h3 className="item-title item-title--tight">
                    {row.participant_name}
                  </h3>

                  <div className="item-total">{row.total_score}</div>
                </div>

                <div className="compact-stats-row">
                  <div className="compact-stat">
                    <span className="compact-stat__label">Låt</span>
                    <span className="compact-stat__value">{row.song_score}</span>
                  </div>

                  <div className="compact-stat">
                    <span className="compact-stat__label">Show</span>
                    <span className="compact-stat__value">{row.show_score}</span>
                  </div>

                  <div className="compact-stat">
                    <span className="compact-stat__label">+/-</span>
                    <span className="compact-stat__value">
                      {row.plusminus_score}
                    </span>
                  </div>

                  <div className="compact-stat compact-stat--total">
                    <span className="compact-stat__label">Total</span>
                    <span className="compact-stat__value">
                      {row.total_score}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default App;