import React, { useState } from "react";
import Timer from "../timer";
import GameBlock from "./GameBlock";
import "./index.scss";

const SprintGame = () => {
    const [points, setPoints] = useState(0);

    const data = [
        {
            id: "5e9f5ee35eb9e72bc21af7ac",
            group: 1,
            page: 9,
            word: "citizen",
            image: "files/10_0781.jpg",
            audio: "files/10_0781.mp3",
            audioMeaning: "files/10_0781_meaning.mp3",
            audioExample: "files/10_0781_example.mp3",
            textMeaning:
                "A <i>citizen</i> is someone who lives in a certain place.",
            textExample:
                "Carlos was born in Spain. He is a Spanish <b>citizen</b>.",
            transcription: "[sítəzən]",
            textExampleTranslate:
                "Карлос родился в Испании. Он гражданин Испании",
            textMeaningTranslate:
                "Гражданин - это тот, кто живет в определенном месте",
            wordTranslate: "гражданин",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7ad",
            group: 1,
            page: 9,
            word: "council",
            image: "files/10_0782.jpg",
            audio: "files/10_0782.mp3",
            audioMeaning: "files/10_0782_meaning.mp3",
            audioExample: "files/10_0782_example.mp3",
            textMeaning:
                "A <i>council</i> is a group of people who run a city or town.",
            textExample:
                "The <b>council</b> met to discuss the new laws for the city.",
            transcription: "[káunsəl]",
            textExampleTranslate:
                "Совет собрался, чтобы обсудить новые законы для города",
            textMeaningTranslate:
                "Совет - это группа людей, которые управляют городом или городом",
            wordTranslate: "совет",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7ae",
            group: 1,
            page: 9,
            word: "declare",
            image: "files/10_0783.jpg",
            audio: "files/10_0783.mp3",
            audioMeaning: "files/10_0783_meaning.mp3",
            audioExample: "files/10_0783_example.mp3",
            textMeaning: "To <i>declare</i> is to say something officially.",
            textExample: "I <b>declared</b> my love for him.",
            transcription: "[diklɛ́ər]",
            textExampleTranslate: "Я объявил свою любовь к нему",
            textMeaningTranslate: "Объявить - значит сказать что-то официально",
            wordTranslate: "объявить",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7af",
            group: 1,
            page: 9,
            word: "enormous",
            image: "files/10_0784.jpg",
            audio: "files/10_0784.mp3",
            audioMeaning: "files/10_0784_meaning.mp3",
            audioExample: "files/10_0784_example.mp3",
            textMeaning: "<i>Enormous</i> people or things are very large.",
            textExample: "My dog looks <b>enormous</b> next to yours.",
            transcription: "[inɔ́ːrməs]",
            textExampleTranslate: "Моя собака выглядит огромной рядом с вашей",
            textMeaningTranslate: "Огромные люди или вещи очень большие",
            wordTranslate: "огромный",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7b0",
            group: 1,
            page: 9,
            word: "extraordinary",
            image: "files/10_0785.jpg",
            audio: "files/10_0785.mp3",
            audioMeaning: "files/10_0785_meaning.mp3",
            audioExample: "files/10_0785_example.mp3",
            textMeaning: "<i>Extraordinary</i> things are amazing.",
            textExample:
                "The fireman who rescued the girl was <b>extraordinary</b>.",
            transcription: "[ikstrɔ́ːrdənèri]",
            textExampleTranslate:
                "Пожарный, который спас девушку, был необычайным",
            textMeaningTranslate: "Необычные вещи удивительны",
            wordTranslate: "экстраординарный",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7b1",
            group: 1,
            page: 9,
            word: "fog",
            image: "files/10_0786.jpg",
            audio: "files/10_0786.mp3",
            audioMeaning: "files/10_0786_meaning.mp3",
            audioExample: "files/10_0786_example.mp3",
            textMeaning:
                "<i>Fog</i> is a thick cloud that is near the ground or water.",
            textExample: "I did not want to drive in the thick <b>fog</b>.",
            transcription: "[fɔːg]",
            textExampleTranslate: "Я не хотел ездить в густом тумане",
            textMeaningTranslate:
                "Туман - это густое облако, которое находится возле земли или воды",
            wordTranslate: "туман",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7b2",
            group: 1,
            page: 9,
            word: "funeral",
            image: "files/10_0787.jpg",
            audio: "files/10_0787.mp3",
            audioMeaning: "files/10_0787_meaning.mp3",
            audioExample: "files/10_0787_example.mp3",
            textMeaning:
                "A <i>funeral</i> is a ceremony that takes place after a person dies.",
            textExample:
                "They had a <b>funeral</b> for the soldier who died during the war.",
            transcription: "[fjúːnərəl]",
            textExampleTranslate:
                "У них были похороны для солдата, который погиб во время войны",
            textMeaningTranslate:
                "Похороны - это церемония, которая происходит после смерти человека",
            wordTranslate: "похороны",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7b3",
            group: 1,
            page: 9,
            word: "giant",
            image: "files/10_0788.jpg",
            audio: "files/10_0788.mp3",
            audioMeaning: "files/10_0788_meaning.mp3",
            audioExample: "files/10_0788_example.mp3",
            textMeaning: "<i>Giant</i> means very big.",
            textExample: "The <b>giant</b> truck got in my way.",
            transcription: "[dʒáiənt]",
            textExampleTranslate: "Гигантский грузовик встал у меня на пути",
            textMeaningTranslate: "Гигант означает очень большой",
            wordTranslate: "гигант",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7b4",
            group: 1,
            page: 9,
            word: "impression",
            image: "files/10_0789.jpg",
            audio: "files/10_0789.mp3",
            audioMeaning: "files/10_0789_meaning.mp3",
            audioExample: "files/10_0789_example.mp3",
            textMeaning:
                "An <i>impression</i> is the way of thinking about someone or something.",
            textExample:
                "Most people’s first <b>impression</b> of Dr. Giani is that he is mean.",
            transcription: "[impréʃən]",
            textExampleTranslate:
                "У большинства людей первое впечатление о докторе Джани заключается в том, что он злой",
            textMeaningTranslate:
                "Впечатление - это способ думать о ком-то или о чем-то",
            wordTranslate: "впечатление",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7b5",
            group: 1,
            page: 9,
            word: "intention",
            image: "files/10_0790.jpg",
            audio: "files/10_0790.mp3",
            audioMeaning: "files/10_0790_meaning.mp3",
            audioExample: "files/10_0790_example.mp3",
            textMeaning: "An <i>intention</i> is what a person plans to do.",
            textExample: "Do you have good <b>intentions</b>?",
            transcription: "[inténʃən]",
            textExampleTranslate: "У тебя хорошие намерения?",
            textMeaningTranslate:
                "Намерение - это то, что человек планирует делать",
            wordTranslate: "намерение",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7b6",
            group: 1,
            page: 9,
            word: "mad",
            image: "files/10_0791.jpg",
            audio: "files/10_0791.mp3",
            audioMeaning: "files/10_0791_meaning.mp3",
            audioExample: "files/10_0791_example.mp3",
            textMeaning: "A <i>mad</i> person or animal is angry.",
            textExample: "Mother got <b>mad</b> when I didn’t listen to her.",
            transcription: "[mæd]",
            textExampleTranslate: "Мать разозлилась, когда я ее не слушал",
            textMeaningTranslate: "Безумный человек или животное злится",
            wordTranslate: "без ума",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7b7",
            group: 1,
            page: 9,
            word: "ought",
            image: "files/10_0792.jpg",
            audio: "files/10_0792.mp3",
            audioMeaning: "files/10_0792_meaning.mp3",
            audioExample: "files/10_0792_example.mp3",
            textMeaning:
                "If you <i>ought</i> to do an action, it is the right thing to do.",
            textExample: "I <b>ought</b> to take my library books back.",
            transcription: "[ɔːt]",
            textExampleTranslate:
                "Я должен забрать свои библиотечные книги обратно",
            textMeaningTranslate:
                "Если вы должны сделать действие, это правильно",
            wordTranslate: "должен",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7b8",
            group: 1,
            page: 9,
            word: "resist",
            image: "files/10_0793.jpg",
            audio: "files/10_0793.mp3",
            audioMeaning: "files/10_0793_meaning.mp3",
            audioExample: "files/10_0793_example.mp3",
            textMeaning: "To <i>resist</i> something is to fight against it.",
            textExample: "He <b>resisted</b> the treatment at the hospital.",
            transcription: "[rizíst]",
            textExampleTranslate: "Он сопротивлялся лечению в больнице",
            textMeaningTranslate:
                "Противостоять чему-либо - значит бороться с этим",
            wordTranslate: "оказывать сопротивление",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7b9",
            group: 1,
            page: 9,
            word: "reveal",
            image: "files/10_0794.jpg",
            audio: "files/10_0794.mp3",
            audioMeaning: "files/10_0794_meaning.mp3",
            audioExample: "files/10_0794_example.mp3",
            textMeaning: "To <i>reveal</i> is to show something.",
            textExample: "I will <b>reveal</b> where I hid the candy bar.",
            transcription: "[rivíːl]",
            textExampleTranslate: "Я покажу, где я спрятал моноблок",
            textMeaningTranslate: "Раскрыть - значит показать что-то",
            wordTranslate: "раскрыть",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7ba",
            group: 1,
            page: 9,
            word: "rid",
            image: "files/10_0795.jpg",
            audio: "files/10_0795.mp3",
            audioMeaning: "files/10_0795_meaning.mp3",
            audioExample: "files/10_0795_example.mp3",
            textMeaning:
                "To <i>rid</i> is to make a place free from something or someone.",
            textExample: "We <b>rid</b> our home of mice by using traps.",
            transcription: "[rid]",
            textExampleTranslate:
                "Мы избавляем наш дом от мышей, используя ловушки",
            textMeaningTranslate:
                "Избавить - значит освободить место от чего-то или кого-то",
            wordTranslate: "избавиться",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7bb",
            group: 1,
            page: 9,
            word: "sword",
            image: "files/10_0796.jpg",
            audio: "files/10_0796.mp3",
            audioMeaning: "files/10_0796_meaning.mp3",
            audioExample: "files/10_0796_example.mp3",
            textMeaning: "A <i>sword</i> is a long sharp weapon.",
            textExample:
                "They used to use <b>swords</b> in battles in ancient times.",
            transcription: "[sɔːrd]",
            textExampleTranslate:
                "Они использовали мечи в сражениях в древние времена",
            textMeaningTranslate: "Меч - длинное острое оружие",
            wordTranslate: "меч",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7bc",
            group: 1,
            page: 9,
            word: "trap",
            image: "files/10_0798.jpg",
            audio: "files/10_0798.mp3",
            audioMeaning: "files/10_0798_meaning.mp3",
            audioExample: "files/10_0798_example.mp3",
            textMeaning:
                "To <i>trap</i> people or animals is to capture them so they cannot get away.",
            textExample: "We <b>trapped</b> butterflies in a net.",
            transcription: "[træp]",
            textExampleTranslate: "Мы поймали бабочек в сеть",
            textMeaningTranslate:
                "Захватить людей или животных - значит поймать их, чтобы они не могли убежать",
            wordTranslate: "ловушка",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7bf",
            group: 1,
            page: 9,
            word: "violent",
            image: "files/10_0800.jpg",
            audio: "files/10_0800.mp3",
            audioMeaning: "files/10_0800_meaning.mp3",
            audioExample: "files/10_0800_example.mp3",
            textMeaning:
                "A <i>violent</i> person or animal uses force to hurt others.",
            textExample:
                "The man was put into jail because he was <b>violent</b>.",
            transcription: "[váiələnt]",
            textExampleTranslate: "Человека посадили в тюрьму за насилие",
            textMeaningTranslate:
                "Насильственный человек или животное использует силу, чтобы причинить боль другим",
            wordTranslate: "неистовый",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7bd",
            group: 1,
            page: 9,
            word: "tale",
            image: "files/10_0797.jpg",
            audio: "files/10_0797.mp3",
            audioMeaning: "files/10_0797_meaning.mp3",
            audioExample: "files/10_0797_example.mp3",
            textMeaning: "A <i>tale</i> is a story.",
            textExample:
                "She told her two friends about the wild <b>tale</b> of her day.",
            transcription: "[teil]",
            textExampleTranslate:
                "Она рассказала своим двум друзьям о дикой истории ее дня",
            textMeaningTranslate: "Сказка - это история",
            wordTranslate: "сказка",
        },
        {
            id: "5e9f5ee35eb9e72bc21af7be",
            group: 1,
            page: 9,
            word: "trial",
            image: "files/10_0799.jpg",
            audio: "files/10_0799.mp3",
            audioMeaning: "files/10_0799_meaning.mp3",
            audioExample: "files/10_0799_example.mp3",
            textMeaning:
                "A <i>trial</i> is the way a court discovers if a person is guilty or innocent.",
            textExample: "He went on <b>trial</b> for robbing the bank.",
            transcription: "[tráiəl]",
            textExampleTranslate: "Он предстал перед судом за ограбление банка",
            textMeaningTranslate:
                "Суд - это способ, которым суд обнаруживает, виновен ли человек или невиновен",
            wordTranslate: "пробный",
        },
    ];

    return (
        <div className="sprint__game_head">
            <Timer />

            <div className="total__poinst">
                Очки: <span>{points}</span>
            </div>

            <GameBlock />
        </div>
    );
};

export default SprintGame;
