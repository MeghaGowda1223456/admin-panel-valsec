export function downloadFileFromString(stringResume, fileName) {
  console.log(stringResume,fileName);
  if (fileName && stringResume && fileName.includes('.')) {
    const type = fileName.split('.')[1];

    if (type) {
      if (type === 'png') {
        downloadImage(stringResume, fileName);
      } else if (type === 'pdf') {
        downloadPdfFile(stringResume, fileName);
      } else if (type === 'doc') {
        downloadDocFile(stringResume, fileName);
      }
    }
  }
}

function downloadImage(stringResume, fileName) {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = `data:image/jpeg;base64,${stringResume}`;
  link.click();
}

function downloadPdfFile(stringResume, fileName) {
  const binaryString = window.atob(stringResume);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i += 1) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([byteArray], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
}

function downloadDocFile(stringResume, fileName) {
  const binaryString = window.atob(stringResume);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i += 1) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([byteArray], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
}
