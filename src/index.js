import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const cardArray_init = ['1', '2', '3', '4', '5', '6', '7', '8'];

/**
 * @description 每張牌，component中最小單位
 */
class Card extends React.Component {

    render() {
        return (
            <div className='card'
                onClick={this.props.onClick}>
                {this.props.value}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 第一比對值
            fstVal: null,
            // 用來記錄第一個翻的牌位置，以便翻第二張牌時可以改前一張牌的狀態
            pre_pos: null,
            // 紀錄所有卡片背後所存的值
            cardArray: shuffle(cardArray_init.concat(cardArray_init)),
            // 一開始預設所有卡片都是蓋上的(蓋false翻true)
            flipArray: Array(16).fill(false),
        }
    }
    /**
     * 
     * @param {*} val 要塞的值
     * @param {*} index 第幾個位置
     */
    renderCard(val, index) {
        let showVal = 'Back';
        if (this.state.flipArray[index]) {
            showVal = val;
        }
        return (<Card
            value={showVal}
            onClick={() => this.handleClick(index)} />);
    }
    handleClick(i) {
        let flipArray_tmp = this.state.flipArray.slice();
        let fstVal_tmp = this.state.fstVal;
        let pre_pos_tmp = this.state.pre_pos;
        const currentVal = this.state.cardArray[i];
        // 記錄每張牌是蓋上或翻開，如果翻過的就不做事
        if (!flipArray_tmp[i]) {
            flipArray_tmp[i] = true;
            this.flipCard(flipArray_tmp);
            console.log('open')
        } else {
            return;
        }
        // 如果全部都翻完了
        if (this.isFinish(flipArray_tmp)) {
            let a = window.confirm('厲害!! \n 在一場?');
            if (a) {
                this.reset();
            }
        } else if (!fstVal_tmp) {
            // 如果是第一次翻，要把位置記錄下來
            fstVal_tmp = currentVal;
            pre_pos_tmp = i;
            this.setState({
                fstVal: currentVal,
                pre_pos: pre_pos_tmp,
            });
        } else if (flipArray_tmp[pre_pos_tmp] && flipArray_tmp[i]) {
            //     // if both card are flipped
            //     // 第一跟第二個值比對成功的話，要留在場上，反之則兩張都蓋起來
            if (fstVal_tmp === currentVal) {
                this.setState({
                    fstVal: null,
                    pre_pos: null,
                    flipArray: flipArray_tmp
                })
            } else {
                this.setState({
                    fstVal: null,
                    pre_pos: null,
                })
                // 原本想在這直接改卡片狀態的array，但不知道為何會動到state裡的值，研究中...，都已經用tmp的值來改了說
                // flipArray_tmp[pre_pos_tmp] = false;
                // flipArray_tmp[i] = false;
                this.unflipCard(pre_pos_tmp, i);
            }
        }
    }

    /**
     * @description 將牌翻開
     */
    flipCard(flipArray_tmp) {
        this.setState({
            flipArray: flipArray_tmp,
        })
    }
    /**
 * @description 將牌蓋上
 */
    unflipCard(prePos, currenPos) {
        let tmpArr = this.state.flipArray;
        tmpArr[prePos] = false;
        tmpArr[currenPos] = false;
        setTimeout(() => {
            this.setState({
                fstVal: null,
                pre_pos: null,
                flipArray: tmpArr,
            })
        }, 500)
    }
    /**
 * @description 判斷遊戲是否結束，大家都翻開了
 */
    isFinish(flipArray) {
        let a = flipArray.some(e => e === false);
        return !a
    }
    reset() {
        this.setState({
            fstVal: null,
            secVal: null,
            pre_pos: null,
            cardArray: shuffle(cardArray_init.concat(cardArray_init)),
            flipArray: Array(16).fill(false),
        })
    }
    render() {
        return (
            <div className='game'>
                <h1 key='title'>MemoryGame</h1>
                <div className='grid-container'>
                    {this.state.cardArray.map((card, index) => {
                        return this.renderCard(card, index)
                    })}
                </div>
                <button className='reset' onClick={() => this.reset()}>Reset</button>
            </div>
        );
    }
}
/**
 * @description 洗牌
 * @param {*} array 
 */
function shuffle(array) {
    let arr_tmp = array;
    for (let i = arr_tmp.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr_tmp[i], arr_tmp[j]] = [arr_tmp[j], arr_tmp[i]];
    }
    return arr_tmp;
}



// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
