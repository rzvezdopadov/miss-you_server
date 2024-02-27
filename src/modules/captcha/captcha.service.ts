import { Injectable } from '@nestjs/common';
import * as Canvas from 'canvas';
import * as config from 'config';
import { SERVER } from '../../core/constants';
import { Random } from '../../core/utils/random';

Canvas.registerFont('./assets/fonts/arial.ttf', { family: 'Arial' });

const server = config.get<string>('SERVER');
const widthCanvas = 180;
const heightCanvas = 40;
const maxCountOfCaptcha = 1000000;
const liveTimeCaptcha = 120; // second
const intervalTimer = 10000; // milisecond

let captchaArr: ICaptcha[] = [];

const alphabet = 'abcdefhjkmnopqrstuvwxyzABCDEFGHJKLMNOPRSTQPRSTUVWXYZ2345678';
function getCoord(num) {
    return Math.floor(Math.random() * num);
}

function getStrRand(num) {
    let str = '';
    for (let i = 0; i < num; i++) {
        str += alphabet[getCoord(alphabet.length)];
    }
    return str;
}

interface ICaptcha {
    str: string;
    livetime: number;
}

@Injectable()
export class CaptchaService {
    async getImage() {
        try {
            const canvas = Canvas.createCanvas(widthCanvas, heightCanvas);
            const context = canvas.getContext('2d');
            const strRand = getStrRand(5 + getCoord(3));
            // context.fillStyle = '#00000000';
            // context.fillRect(0, 0, widthCanvas, heightCanvas);
            context.font = '24px Arial';
            const colorRange = 80;
            const colorMin = 254 / 2 - colorRange / 2;
            const colorMax = 254 / 2 + colorRange / 2;

            const setRandStrokeStyle = () => {
                const getColor = () =>
                    Random.getRandomInteger(colorMin, colorMax);

                context.strokeStyle = `rgb(${getColor()}, ${getColor()}, ${getColor()})`;
            };

            for (let i = 0; i < strRand.length; i++) {
                setRandStrokeStyle();

                context.strokeText(
                    strRand[i],
                    10 + (i * (widthCanvas - 10)) / strRand.length,
                    20 + getCoord(10),
                );
            }

            context.lineWidth = 1;

            for (let i = 0; i < 3; i++) {
                setRandStrokeStyle();

                context.beginPath();
                context.moveTo(getCoord(30), getCoord(heightCanvas));
                context.lineTo(
                    widthCanvas - getCoord(30),
                    getCoord(heightCanvas),
                );
                context.stroke();
            }

            const buffer = canvas.toBuffer('image/png');

            captchaArr.push({
                str: strRand,
                livetime: liveTimeCaptcha,
            });
            if (captchaArr.length > maxCountOfCaptcha) captchaArr = [];
            return buffer;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    isHaveCaptcha(str: string): boolean {
        for (let i = 0; i < captchaArr.length; i++) {
            if (captchaArr[i].str === str) {
                captchaArr[i].livetime = 0;
                return true;
            }
        }

        return false;
    }
}

if (server !== SERVER.test) {
    setInterval(() => {
        const newArr: ICaptcha[] = [];
        const intervalValue = intervalTimer / 1000;

        captchaArr.forEach((elem) => {
            elem.livetime -= intervalValue;
            if (elem.livetime > 0) newArr.push(elem);
        });

        captchaArr = newArr;
    }, intervalTimer);
}
