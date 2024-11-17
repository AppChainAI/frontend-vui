// 定义 toast 类型枚举
export type ToastType = 'info' | 'success' | 'error' | 'warning';

// 定义 toast 函数
export function toast(message: string, type: ToastType = 'info'): void {
	// 获取 toast 容器
	const toastContainer: HTMLElement | null = document.getElementById('toast');
	
	if (!toastContainer) {
		console.error('Toast container not found');
		return;
	}
	
	// 创建提示框元素
	const alertDiv: HTMLDivElement = document.createElement('div');

	// 图标
	let icon: string = "fa-solid fa-circle-info";
	// 设置提示框样式
	switch (type) {
		case 'info':
			alertDiv.className = 'alert alert-info'
            icon = `<svg
                    xmlns = "http://www.w3.org/2000/svg"
                    fill = "none"
                    viewBox = "0 0 24 24"
                    class="h-6 w-6 shrink-0 stroke-current" >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg > `
			break
		case 'success':
			alertDiv.className = 'alert alert-success'
            icon = `<svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> `
			break
		case 'error':
			alertDiv.className = 'alert alert-error'
            icon = `<svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> `
			break
		case 'warning':
			alertDiv.className = 'alert alert-warning'
            icon = `<svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg> `
			break
		default:
			alertDiv.className = 'alert alert-info'
			break
	}

	// 添加图标
	alertDiv.innerHTML = icon;
	
	// 创建消息文本元素
	const messageSpan: HTMLSpanElement = document.createElement('span');
	messageSpan.textContent = message;
	alertDiv.appendChild(messageSpan);
	
	// 添加到 toast 容器头部
	toastContainer.insertBefore(alertDiv, toastContainer.firstChild);
	
	// 添加进入动画
	requestAnimationFrame((): void => {
		alertDiv.style.transform = 'translateY(0)';
		alertDiv.style.opacity = '1';
	});
	
	// 5秒后移除
	setTimeout((): void => {
		alertDiv.style.transform = 'translateY(-20px)';
		alertDiv.style.opacity = '0';
		
		// 动画结束后移除元素
		setTimeout((): void => {
			toastContainer.removeChild(alertDiv);
		}, 300);
	}, 5000);
}
