export const generatePDFResume = async (resumeData, setIsGeneratingPDF) => {
  setIsGeneratingPDF(true);

  try {
    const [{ jsPDF }] = await Promise.all([
      import('jspdf'),
      import('jspdf-autotable'),
    ]);

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    doc.setProperties({
      title: 'Victor Kibiwott - Resume',
      subject: 'Resume',
      author: 'Victor Kibiwott',
      keywords: 'resume, developer, full stack',
      creator: 'Victor Kibiwott Portfolio',
    });

    const primaryColor = [147, 51, 234];
    const secondaryColor = [30, 41, 59];
    const textColor = [15, 23, 42];
    const lightTextColor = [100, 116, 139];
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - 2 * margin;

    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(resumeData.personalInfo.name, margin, 20);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Full Stack Developer', margin, 30);

    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2], 0.1);
    doc.rect(0, 40, pageWidth, 25, 'F');
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(10);
    const contactY = 50;
    const contactSpacing = 30;
    doc.text(`Phone: ${resumeData.personalInfo.phone}`, margin, contactY);
    doc.text(
      `Email: ${resumeData.personalInfo.email}`,
      margin + contactSpacing * 1.5,
      contactY
    );
    doc.text(
      `LinkedIn: ${resumeData.personalInfo.linkedin}`,
      margin + contactSpacing * 4,
      contactY
    );
    doc.text('Location: Nairobi, Kenya', margin, contactY + 8);

    let yPos = 75;
    const sectionTitle = (title) => {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(title, margin, yPos);
      yPos += 8;
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;
    };

    sectionTitle('PROFESSIONAL SUMMARY');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    const summaryLines = doc.splitTextToSize(
      resumeData.personalInfo.summary,
      contentWidth
    );
    doc.text(summaryLines, margin, yPos);
    yPos += summaryLines.length * 6 + 5;

    sectionTitle('PROFESSIONAL EXPERIENCE');
    resumeData.experiences.forEach((exp) => {
      yPos += 10;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(exp.position, margin, yPos);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'italic');
      doc.text(`${exp.company} | ${exp.period}`, margin, yPos + 6);
      yPos += 12;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      exp.responsibilities.forEach((resp) => {
        const bulletLines = doc.splitTextToSize(`• ${resp}`, contentWidth - 5);
        doc.text(bulletLines, margin + 5, yPos);
        yPos += bulletLines.length * 5 + 2;
      });
      yPos += 3;
    });

    sectionTitle('EDUCATION');
    resumeData.education.forEach((edu) => {
      yPos += 10;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(edu.degree, margin, yPos);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'italic');
      doc.text(`${edu.institution} | ${edu.period}`, margin, yPos + 6);
      yPos += 12;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(edu.description, margin, yPos);
      yPos += 8;
    });

    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    sectionTitle('CERTIFICATIONS');
    resumeData.certifications.forEach((cert) => {
      yPos += 10;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(cert.title, margin, yPos);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'italic');
      doc.text(`${cert.issuer} | ${cert.date}`, margin, yPos + 6);
      yPos += 12;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const certLines = doc.splitTextToSize(cert.description || '', contentWidth);
      doc.text(certLines, margin, yPos);
      yPos += certLines.length * 5 + 5;
    });

    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    sectionTitle('TECHNICAL SKILLS');
    doc.setFontSize(10);
    resumeData.skills.forEach((skill) => {
      const skillLines = doc.splitTextToSize(`• ${skill}`, contentWidth - 5);
      doc.text(skillLines, margin + 5, yPos);
      yPos += skillLines.length * 5 + 2;
    });

    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    yPos += 5;
    sectionTitle('ACTIVITIES & INTERESTS');
    const activitiesLines = doc.splitTextToSize(resumeData.activities, contentWidth);
    doc.text(activitiesLines, margin, yPos);

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
      doc.text(
        `Victor Kibiwott | Resume | Page ${i} of ${totalPages}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    doc.save('Victor_Kibiwott_Resume.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('There was an error generating your resume. Please try again.');
  } finally {
    setIsGeneratingPDF(false);
  }
};

export const generateDOCXResume = (resumeData) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><title>Victor Kibiwott - Resume</title></head>
    <body>
      <h1>${resumeData.personalInfo.name}</h1>
      <h2>Full Stack Developer</h2>
      <p>Phone: ${resumeData.personalInfo.phone}</p>
      <p>Email: ${resumeData.personalInfo.email}</p>
      <p>${resumeData.personalInfo.summary}</p>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Victor_Kibiwott_Resume.doc';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};

export const isVideoDemoUrl = (url = '') =>
  /\.(mp4|webm|mov)(\?|$)/i.test(url) ||
  (url.includes('cloudinary.com') && url.includes('/video/'));
