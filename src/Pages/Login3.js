import React, { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import authService from '../services/authService'

const Login3 = () => {
    const navigate = useNavigate()
    const [code, setCode] = useState(['', '', '', ''])
    const [loading, setLoading] = useState(false)
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

    // Check if user is already logged in
    useEffect(() => {
        if (authService.isAuthenticated()) {
            navigate('/')
        }
    }, [navigate])

    // Focus first input on mount
    useEffect(() => {
        inputRefs[0].current?.focus()
    }, [])

    const handleInputChange = (index, value) => {
        // Only allow digits
        if (value && !/^\d$/.test(value)) return

        const newCode = [...code]
        newCode[index] = value

        setCode(newCode)

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs[index + 1].current?.focus()
        }
    }

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs[index - 1].current?.focus()
        }
        // Handle paste
        if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault()
            navigator.clipboard.readText().then((text) => {
                const digits = text.replace(/\D/g, '').slice(0, 4).split('')
                const newCode = [...code]
                digits.forEach((digit, i) => {
                    if (i < 4) newCode[i] = digit
                })
                setCode(newCode)
                if (digits.length > 0) {
                    inputRefs[Math.min(digits.length, 3)].current?.focus()
                }
            })
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const codeString = code.join('')

            if (codeString.length !== 4) {
                toast.error('Please enter all 4 digits')
                setLoading(false)
                return
            }

            const response = await authService.loginWithCode(codeString)

            if (response.success) {
                toast.success('Login successful! Welcome back.')
                navigate('/')
            } else {
                toast.error(response.message || 'Login failed')
                // Clear the code on error
                setCode(['', '', '', ''])
                inputRefs[0].current?.focus()
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Could not login. Please try again.'
            toast.error(errorMessage)
            // Clear the code on error
            setCode(['', '', '', ''])
            inputRefs[0].current?.focus()
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8} lg={6} xl={5}>
                        <CCard className="shadow-sm">
                            <CCardBody className="p-5">
                                <CForm onSubmit={handleLogin}>
                                    <div className="text-center mb-4">
                                        {/* Lock Icon */}
                                        <div
                                            className="mb-3 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                                            style={{
                                                width: '64px',
                                                height: '64px',
                                            }}
                                        >
                                            <CIcon icon={cilLockLocked} size="xl" className="text-white" />
                                        </div>
                                        <h1 className="h3 mb-2 fw-bold">Welcome Back</h1>
                                        <p className="text-body-secondary mb-0">
                                            Enter your 4-digit security code to sign in
                                        </p>
                                    </div>

                                    {/* 4-Digit Code Input */}
                                    <div className="mb-4">
                                        <label className="form-label text-center w-100 mb-3 fw-semibold">
                                            Security Code
                                        </label>
                                        <div className="d-flex justify-content-center gap-2 gap-md-3">
                                            {code.map((digit, index) => (
                                                <CFormInput
                                                    key={index}
                                                    ref={inputRefs[index]}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                                    className="text-center fw-bold"
                                                    style={{
                                                        width: '56px',
                                                        height: '56px',
                                                        fontSize: '24px',
                                                        borderRadius: '8px',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <div className="text-center mt-2">
                                            <small className="text-muted">
                                                Enter the 4-digit code provided to you
                                            </small>
                                        </div>
                                    </div>

                                    {/* Login Button */}
                                    <div className="d-grid gap-2">
                                        <CButton
                                            color="success"
                                            type="submit"
                                            size="lg"
                                            className="text-white"
                                            disabled={loading || code.join('').length !== 4}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Signing in...
                                                </>
                                            ) : (
                                                'Sign In'
                                            )}
                                        </CButton>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="text-center mt-4">
                                        <p className="text-muted small mb-0">
                                            <CIcon icon={cilLockLocked} size="sm" className="me-1" />
                                            Secure authentication
                                        </p>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login3
