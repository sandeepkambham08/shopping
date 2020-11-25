import reducer from './reducer';
import itemsData from '../data/products.json';

describe('Reducer ',()=>{
    it('initial state',()=>{
        expect(reducer(undefined,{})).toEqual({
            counter: 0,
            itemsData: itemsData,
            cart: {},
            orderCompleted:false,
            orderTotal:0,
        });
    });

    it('Should increase counter quantity',()=>{
        expect(reducer({
            counter: 0,
            itemsData: itemsData,
            cart: {},
            orderCompleted:false,
            orderTotal:0,
        },{
            type:'INCREMENT'
        })).toEqual({
            counter: 1,
            itemsData: itemsData,
            cart: {},
            orderCompleted:false,
            orderTotal:0,
        })
    })
    it('Should fix the order total',()=>{
        expect(reducer({
            counter: 0,
            itemsData: itemsData,
            cart: {},
            orderCompleted:false,
            orderTotal:0,
        },{
            type:'FIX_TOTAL',
            value:'some-value'
        })).toEqual({
            counter: 0,
            itemsData: itemsData,
            cart: {},
            orderCompleted:false,
            orderTotal:'some-value',
        })
    })
});