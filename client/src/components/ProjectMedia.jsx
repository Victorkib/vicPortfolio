const resolveCoverImage = (project) =>
  project.media?.coverImage || project.preview || '/placeholder.svg';

const resolveDemoVideo = (project) => project.media?.demoVideo || null;

const ProjectMedia = ({
  project,
  className,
  variant = 'image',
  controls = false,
}) => {
  const coverImage = resolveCoverImage(project);
  const demoVideo = resolveDemoVideo(project);

  if (variant === 'video' && demoVideo) {
    return (
      <video
        src={demoVideo}
        poster={coverImage}
        controls={controls}
        muted={!controls}
        loop={!controls}
        playsInline
        preload="metadata"
        className={className}
      />
    );
  }

  return (
    <img
      src={coverImage}
      alt={project.title}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
};

export default ProjectMedia;
