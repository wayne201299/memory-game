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
            // 第二比對值
            secVal: null,
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
        const flipArray_tmp = this.state.flipArray.slice();
        let fstVal_tmp = this.state.fstVal;
        let secVal_tmp = this.state.secVal;
        let pre_pos_tmp = this.state.pre_pos;
        const current = this.state.cardArray[i];
        // 記錄每張牌是蓋上或翻開
        console.log(flipArray_tmp);
        if (!flipArray_tmp[i]) {
            flipArray_tmp[i] = true;
        } else {
            return;
        }
        // 如果是第一次翻，要把位置記錄下來
        if (!fstVal_tmp) {
            fstVal_tmp = current;
            pre_pos_tmp = i;
        } else {
            // second time
            secVal_tmp = current;
            // 第一跟第二個值比對成功的話，要留在場上，反之則兩張都蓋起來
            if (fstVal_tmp === secVal_tmp) {
                // TODO:比對成功要做的事?
                alert('Match!')
            } else {
                alert('FAIL!')
                flipArray_tmp[this.state.pre_pos] = false;
                flipArray_tmp[i] = false;
            }
            pre_pos_tmp = null;
            fstVal_tmp = null;
            secVal_tmp = null;
        }

        // alert('fst:' + fstVal_tmp + ' ,2nd:' + secVal_tmp + ' ,position:' + pre_pos_tmp)
        this.setState({
            fstVal: fstVal_tmp,
            secVal: secVal_tmp,
            pre_pos: pre_pos_tmp,
            cardArray: this.state.cardArray,
            flipArray: flipArray_tmp,
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
                <button className='reset' onClick={() => {
                    this.setState({
                        fstVal: null,
                        secVal: null,
                        pre_pos: null,
                        cardArray: shuffle(cardArray_init.concat(cardArray_init)),
                        flipArray: Array(16).fill(false),
                    })
                }}>Reset</button>
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
