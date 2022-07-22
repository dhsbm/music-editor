import { hideMask } from 'modules/mask'

const driverOptions = {
  animate: false, // Whether to animate or not
  opacity: 0.3, // Background opacity (0 means only popovers and without overlay)
  padding: 2, // Distance of element from around the edges
  allowClose: false, // Whether the click on overlay should close or not
  overlayClickNext: false, // Whether the click on overlay should move next
  doneBtnText: '完成教学', // Text on the final button
  closeBtnText: '跳过教程', // Text on the close button for this step
  nextBtnText: '下一步 ', // Next button text for this step
  prevBtnText: '上一步', // Previous button text for this step
  onReset: () => {
    document.body.style.overflow = 'auto'
    hideMask()
  },
}

export default driverOptions
