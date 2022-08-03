Ключевые моменты Redux: \
`-` Хранилище (store): хранит состояние приложения. \
`-` Действия (actions): некоторый набор информации, который исходит от приложения к хранилищу и который указывает, что именно нужно сделать. Для передачи этой информации у хранилища вызывается метод dispatch(). \
`-` Создатели действий (action creators): функции, которые создают действия. \
`-` Reducer : функция (или несколько функций), которая получает действие и в соответствии с этим действием изменяет состояние хранилища.

Общую схему взаимодействия элементов архитектуры Redux можно выразить следующим образом:

![Redux_schema](https://user-images.githubusercontent.com/48245816/170900077-d6dfd961-e8d2-4636-a512-64242a8c70fa.png)


Для работы с Redux в React нам понадобятся зависимости "redux" и "react-redux".

## Create store 
```
import { createStore } from 'redux';

const store = createStore(reducer);

export default store;
```

## Reducer
Reducer — читая функция которая будет отвечать за обновление состояния. Здесь реализовывается логика в соответствие с которой будет происходить обновление полей store.
```
function reducer(state, action) {
    switch(action.type) {
        case ACTION_1: return { value: action.value_1 };
        case ACTION_2: return { value: action.value_2 };
        
        default: return state;
    }
}
```

## Обновление состояния 
Что бы обновить store необходимо вызвать метод dispatch(). Он вызывается у объекта store который вы создаёте в store.js. Этот объект принято называть store поэтому

## actionCreator
На самом деле передавать объект события напрямую в dispatch() является признаком плохого тона. Для этого нужно использовать функцию под названием actionCreator. Она делает ровно то что и ожидается. Создаёт событие! Вызов этой функции нужно передавать как аргумент в dispatch а в actionCreator передавать необходимое значение (value). Базовый actionCreator выглядит следующим образом:
```
function action_1(value) {
    return { 
        type: ACTION_1,
        value_1: value
    };
}

export default action_1;
```

## Actions
Actions это константы, описывающие событие. Обычно это просто строка с названием описывающее событие. К примеру константа описывающее событие номер один будет выглядеть следующем образом:

```
const ACTION_1 = "ACTION_1";
```

## Provider 
Чтобы иметь доступ к store, приложение необходимо обернуть в Provider и создать store.

```
import Provider from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
    <List />
    </Provider>
  )
}
```

## useSelector и useDispatch
**useSelector** . В качестве аргумента селектор будет передавать Redux state и будет вызываться когда компонент перерендеривается, так же он подписывается на store и вызывается каждый раз при изменении.
```
const data = useSelector(state => state.data)
```

**useDispatch()**
Этот хук возвращает ссылку на dispatch функцию из Redux. Вы можете использовать его для отправки действий.

```
function addFilm(title) {
  return { type:ADD_FILM, payload:title}
}
const dispatch = useDispatch()

dispatch(addFilm('New film to store'))
```
