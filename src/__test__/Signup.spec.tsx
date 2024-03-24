//Jest로 테스트 코드를 진행하기 위해 @testing-library'를 import 한다.
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import SignupPage from "../pages/SignupPage"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from '@tanstack/react-query';

const queryClient= new QueryClient({
    defaultOptions : {}
});

describe("회원가입 테스트", ()=>{
    beforeEach(()=> {
        const routes =[
        { //메모리 라우터
            path : "/signup",
            element : <SignupPage />,
        }
    ];
    const router = createMemoryRouter(routes,{
        initialEntries : ["/signup"],
        initialIndex : 0,
    })
    render(
        <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
    )
})
    test("비밀번호와 비밀번호 확인 값이 일치하지 않으면 에러메세지가 표시된다. ", async ()=>{
        //Given - 회원가입이 페이지 그려짐

    //When - 비밀번와 비밀번호 확인 값이 일치하지 않을때

    const passwordInput = screen.getByLabelText('비밀번호');
    const confirmPasswordInput = screen.getByLabelText('비밀번호 확인')

    fireEvent.change(passwordInput,({target : {value : 'password'}}))
    fireEvent.change(confirmPasswordInput,({target : {value : 'wrongPassword'}}))
    //then - 에러메세지가 표시된다.
    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
})
    test('이메일을 입력하고, 비밀번호와 비밀번호 확인값이 일치하면 회원가입이 성공한다.', () =>{ 
        //given
        const signupButton = screen.getByRole("button",{name : "회원가입"});
        expect(signupButton).toBeDisabled();
        //when
        const emailInput = screen.getByLabelText('이메일')
        const passwordInput = screen.getByLabelText('비밀번호')
        const confirmInput = screen.getByLabelText('비밀번호 확인')

        fireEvent.change(emailInput,{target : {value : 'test@email.com'}})
        fireEvent.change(passwordInput,{target : {value : 'password'}})
        fireEvent.change(confirmInput,{target : {value : 'password'}})
        //then
        expect(signupButton).toBeEnabled();
    })
})



