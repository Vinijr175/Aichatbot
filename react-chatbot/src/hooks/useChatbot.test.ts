import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import useChatbot from './useChatbot';


vi.mock('axios');
const mockedAxios = axios as any;

describe('useChatbot Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize with empty messages and not loading', () => {
        const { result } = renderHook(() => useChatbot());
        expect(result.current.messages).toEqual([]);
        expect(result.current.isLoading).toBe(false);
    });

    it('should append user message and bot response on success', async () => {
        const mockResponse = { data: { content: 'Hello, how can I help you today?' } };
        mockedAxios.post.mockResolvedValueOnce(mockResponse);
        mockedAxios.isAxiosError.mockReturnValue(false);

        const { result } = renderHook(() => useChatbot());

        let promise: Promise<void> | undefined;
        act(() => {
            promise = result.current.sendMessage('Hello bot');
        });

        
        expect(result.current.messages).toEqual([
            { text: 'Hello bot', sender: 'user' }
        ]);
        expect(result.current.isLoading).toBe(true);

        
        await act(async () => {
            await promise;
        });

        
        expect(result.current.messages).toEqual([
            { text: 'Hello bot', sender: 'user' },
            { text: 'Hello, how can I help you today?', sender: 'bot' }
        ]);
        expect(result.current.isLoading).toBe(false);
        expect(mockedAxios.post).toHaveBeenCalledWith('/api/chat', {
            messages: [{ role: 'user', content: 'Hello bot' }]
        }, expect.any(Object));
    });

    it('should handle API failure and append a friendly error message', async () => {
        const mockError = {
            response: {
                status: 500,
                data: { error: 'Internal Server Error', details: 'Missing API key. Check your environment setup.' }
            }
        };
        
        mockedAxios.isAxiosError.mockReturnValueOnce(true);
        mockedAxios.post.mockRejectedValueOnce(mockError);

        const { result } = renderHook(() => useChatbot());

        let promise: Promise<void> | undefined;
        act(() => {
            promise = result.current.sendMessage('trigger error');
        });

        await act(async () => {
            await promise;
        });

        
        expect(result.current.messages).toEqual([
            { text: 'trigger error', sender: 'user' },
            { text: 'Missing API key. Check your environment setup.', sender: 'system' }
        ]);
        expect(result.current.isLoading).toBe(false);
    });
});
