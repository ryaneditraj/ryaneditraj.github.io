const fileList = document.getElementById('fileList');
const files = [
  'file1.txt',
  'file2.pdf',
  'file3.jpg'
];

function displayFiles() {
  fileList.innerHTML = '';

  files.forEach(fileName => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = fileName;
    link.textContent = fileName;
    listItem.appendChild(link);
    fileList.appendChild(listItem);
  });
}

displayFiles();
