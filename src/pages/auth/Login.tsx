import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label"
import elips from "../../assets/elips-bcg.svg"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLogin } from "@/hooks/useLogin"
import { loginSchema, type LoginFormData } from "@/validations/login-schema"
import { getErrorMessage } from "@/utils/errorUtils"

const Login = () => {
    const {mutate, isPending, error} = useLogin();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = (data: LoginFormData) => {
        mutate(data);
    }

    return (
        <section className="min-h-screen flex font-poppins relative">
            <div className="flex-1 flex flex-col justify-between items-center px-8 pt-10 pb-10 relative z-10">
                <header>
                    <img src="/Logo.svg" alt="megacoop-logo" />
                </header>

                {/* Login form */}
                <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-3xl text-megagreen font-bold mb-8 text-center">Welcome Back</h1>
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg space-y-6">
                        <div>
                            <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                                Email
                            </Label>
                            <Input
                                {...register("email")}
                                type="email" 
                                id="email" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                placeholder="enter your email"
                                disabled={isPending}
                            />
                            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                                Password
                            </Label>
                            <Input
                                {...register("password")}
                                type="password" 
                                id="password" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                placeholder="enter your password"
                                disabled={isPending}
                            />
                            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full bg-megagreen hover:bg-megagreen/90 text-white font-semibold py-2 px-4 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                            disabled={isPending}
                        >
                            {isPending ? "Logging in..." : "Login"}
                        </Button>
                        
                    </div>
                    {error && <p className="text-sm text-red-500 mt-4 text-center">{getErrorMessage(error, 'Login failed. Please try again.')}</p>}
                </form>

                <footer>
                    <p>
                        Secured by <span className="text-megagreen font-semibold">
                            Mega<span className="text-black">Coop</span>
                        </span>
                    </p>
                </footer>
            </div>

            <div 
                className="absolute bottom-0 right-0 w-80 h-80 z-[-1]"
                style={{
                    backgroundImage: `url("${elips}")`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'bottom right'
                }}
            />
        </section>
    )
}

export default Login
