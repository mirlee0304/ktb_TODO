import React, {useState} from "react";

function TodoInput({ addTodo }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            addTodo(inputValue);
            setInputValue('');
        }
    };
    //폼 제출 이벤트의 기본 동작은 폼 데이터를 서버에 전송하고 페이지를 새로 고침하는 것입니다. 
    //하지만 React 애플리케이션에서는 폼 제출 시 페이지 새로 고침을 방지하고 
    //대신 JavaScript로 필요한 처리를 하고자 할 때 e.preventDefault();를 사용합니다.

    //<=React의 핵심 개념 중 하나는 상태 관리(state management)와 상태가 변경될 때 UI를 자동으로 업데이트하는 것입니다. 
    //이는 사용자 경험을 향상시키고 페이지가 불필요하게 새로고침되는 것을 방지합니다.


    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
            />
            <button type="submit">Add Todo</button>
        </form>
    )
    //onChange={(e) => setInputValue(e.target.value)}는 React에서 입력 필드의 값을 상태와 동기화하기 위해 사용하는 이벤트 핸들러입니다.
    //구성 요소 설명
    //onChange: 이 속성은 HTML 입력 요소의 change 이벤트가 발생할 때 호출될 함수를 지정합니다. 
    //change 이벤트는 사용자가 입력 필드에 값을 입력할 때 발생합니다.

    //(e) => setInputValue(e.target.value): 화살표 함수로, onChange 이벤트가 발생할 때 실행되는 콜백 함수입니다. 
    //여기서 e는 이벤트 객체를 나타내며, e.target은 이벤트가 발생한 요소(이 경우 입력 필드)를 참조합니다.

    //e: 이벤트 객체로, 이벤트와 관련된 여러 정보를 포함하고 있습니다.
    //e.target: 이벤트가 발생한 DOM 요소를 가리킵니다.
    //e.target.value: 입력 필드의 현재 값을 나타냅니다.
    //setInputValue(e.target.value): setInputValue 함수는 useState 훅에 의해 제공된 상태 업데이트 함수로, 
    //입력 필드의 현재 값을 상태로 설정합니다.
}

export default TodoInput;