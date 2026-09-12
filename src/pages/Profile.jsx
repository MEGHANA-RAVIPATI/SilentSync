import { useState } from "react";
import { Link } from "react-router-dom";
import words from "../data/words";
import profileImage from "../assets/profile.png";

function Profile() {
  const [editing, setEditing] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [uploadedPhoto, setUploadedPhoto] = useState(
    localStorage.getItem("profilePhoto") || ""
  );

  const [name, setName] = useState(
    localStorage.getItem("profileName") || "Your Name"
  );

  const [email, setEmail] = useState(
    localStorage.getItem("profileEmail") || ""
  );

  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);

  const completedLevels = JSON.parse(
    localStorage.getItem("wordCompletedLevels") || "[]"
  );

  const completedWords = completedLevels.reduce(
    (total, levelNumber) => {
      return (
        total +
        words.filter(
          (word) => word.level === levelNumber
        ).length
      );
    },
    0
  );

  const totalWords = words.length;

  const wordProgress =
    totalWords > 0
      ? Math.round(
          (completedWords / totalWords) * 100
        )
      : 0;

  const levelsCompleted =
    completedLevels.length;

  const levelProgress = Math.round(
    (levelsCompleted / 14) * 100
  );

  const xp = Number(
    localStorage.getItem("silentSyncXP") || 0
  );

  const overallProgress = Math.round(
    (wordProgress + levelProgress) / 2
  );

  const saveProfile = () => {
    const finalName =
      editName.trim() || "Your Name";

    const finalEmail =
      editEmail.trim();

    localStorage.setItem(
      "profileName",
      finalName
    );

    localStorage.setItem(
      "profileEmail",
      finalEmail
    );

    setName(finalName);
    setEmail(finalEmail);

    setEditing(false);
  };

  const cancelEdit = () => {
    setEditName(name);
    setEditEmail(email);
    setEditing(false);
  };

  const openEditProfile = () => {
    setEditName(name);
    setEditEmail(email);
    setEditing(true);
  };

  const handlePhotoUpload = (event) => {
    const file =
      event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const photo = reader.result;

      setUploadedPhoto(photo);
      setShowAvatar(false);

      localStorage.setItem(
        "profilePhoto",
        photo
      );
    };

    reader.readAsDataURL(file);
  };

  const continueLearning = () => {
    const nextLevel =
      levelsCompleted >= 14
        ? 14
        : levelsCompleted + 1;

    window.location.href =
      `/words/level/${nextLevel}`;
  };

  const currentProfileImage =
    showAvatar
      ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Akshitha"
      : uploadedPhoto || profileImage;

  return (
    <div className="professional-profile-page">

      {/* TOP BAR */}

      <header className="profile-topbar">

        <Link
          to="/"
          className="profile-brand"
        >
          <span className="profile-brand-icon">
            🤟
          </span>

          <span>
            Silent<span>Sync</span>
          </span>
        </Link>


        <div className="profile-search">

          🔍

          <input
            type="text"
            placeholder="Search..."
          />

        </div>


        <div className="profile-top-actions">

          <button className="notification-button">
            🔔
          </button>


          <div className="mini-avatar">

            <img
              src={currentProfileImage}
              alt="Profile"
            />

          </div>


          <button
            className="profile-chevron"
            onClick={() =>
              setShowProfileMenu(
                !showProfileMenu
              )
            }
          >
            ▼
          </button>


          {showProfileMenu && (
            <div className="profile-dropdown">

              <Link
                to="/profile"
                onClick={() =>
                  setShowProfileMenu(false)
                }
              >
                👤 Profile
              </Link>


              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  alert("Settings coming soon!");
                }}
              >
                ⚙️ Settings
              </button>


              <button
                onClick={() => {
                  localStorage.removeItem(
                    "profileName"
                  );

                  localStorage.removeItem(
                    "profileEmail"
                  );

                  setShowProfileMenu(false);

                  window.location.href = "/";
                }}
              >
                🚪 Logout
              </button>

            </div>
          )}

        </div>

      </header>


      {/* LAYOUT */}

      <div className="profile-layout">


        {/* SIDEBAR */}

        <aside className="profile-sidebar">

          <nav>

            <Link
              to="/"
              className="sidebar-item"
            >
              <span>⌂</span>
              Home
            </Link>


            <Link
              to="/learning"
              className="sidebar-item"
            >
              <span>📚</span>
              Learning
            </Link>


            <Link
              to="/game"
              className="sidebar-item"
            >
              <span>🎮</span>
              Game
            </Link>


            <Link
              to="/progress"
              className="sidebar-item"
            >
              <span>📊</span>
              Progress
            </Link>


            <Link
              to="/profile"
              className="sidebar-item active"
            >
              <span>👤</span>
              Profile
            </Link>


            <Link
              to="/feedback"
              className="sidebar-item"
            >
              <span>💬</span>
              Feedback
            </Link>

          </nav>


          <div className="sidebar-footer">

            <div className="sidebar-logo">
              🤟
            </div>

            <small>
              Keep learning.
              <br />
              Keep signing.
            </small>

          </div>

        </aside>


        {/* MAIN */}

        <main className="profile-main">


          {/* HERO */}

          <section className="profile-hero">

            <div className="profile-hero-background"></div>


            <div className="profile-hero-content">

              <div className="large-profile-photo">

                <img
                  src={currentProfileImage}
                  alt="Profile"
                />


                <label className="camera-button">

                  📷

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    hidden
                  />

                </label>

              </div>


              <div className="profile-hero-info">

                <span className="profile-role">
                  SILENTSYNC LEARNER
                </span>


                <h1>
                  {name}
                </h1>


                <p className="profile-motivation">
                  Keep learning, keep practicing, keep signing.
                </p>


                <div className="profile-meta">

                  <span>
                    📧 {email || "Add your email"}
                  </span>

                  <span>
                    🎯 {overallProgress}% Complete
                  </span>

                </div>

              </div>


              <button
                className="hero-edit-button"
                onClick={openEditProfile}
              >
                ✏️ Edit Profile
              </button>

            </div>

          </section>


          {/* EDIT PROFILE */}

          {editing && (
            <section className="profile-edit-card">

              <div className="edit-title">

                <h2>
                  Edit Profile
                </h2>

                <p>
                  Update your personal information.
                </p>

              </div>


              <div className="edit-fields">

                <div>

                  <label>
                    Name
                  </label>

                  <input
                    value={editName}
                    onChange={(event) =>
                      setEditName(
                        event.target.value
                      )
                    }
                    placeholder="Enter your name"
                  />

                </div>


                <div>

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    value={editEmail}
                    onChange={(event) =>
                      setEditEmail(
                        event.target.value
                      )
                    }
                    placeholder="Enter your email"
                  />

                </div>

              </div>


              <div className="edit-actions">

                <button
                  className="cancel-edit"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>


                <button
                  className="save-edit"
                  onClick={saveProfile}
                >
                  Save Changes
                </button>

              </div>

            </section>
          )}


          {/* STAT CARDS */}

          <section className="profile-stat-grid">

            <div className="profile-stat-card">

              <div className="stat-icon purple-stat">
                ⭐
              </div>

              <div>

                <span>
                  Total XP
                </span>

                <strong>
                  {xp}
                </strong>

              </div>

            </div>


            <div className="profile-stat-card">

              <div className="stat-icon blue-stat">
                📚
              </div>

              <div>

                <span>
                  Words Completed
                </span>

                <strong>
                  {completedWords}/{totalWords}
                </strong>

              </div>

            </div>


            <div className="profile-stat-card">

              <div className="stat-icon pink-stat">
                🏆
              </div>

              <div>

                <span>
                  Levels Completed
                </span>

                <strong>
                  {levelsCompleted}/14
                </strong>

              </div>

            </div>


            <div className="profile-stat-card">

              <div className="stat-icon orange-stat">
                📈
              </div>

              <div>

                <span>
                  Overall Progress
                </span>

                <strong>
                  {overallProgress}%
                </strong>

              </div>

            </div>

          </section>


          {/* CONTENT GRID */}

          <section className="profile-content-grid">


            {/* PERSONAL INFORMATION */}

            <div className="profile-panel">

              <div className="panel-heading">

                <div className="panel-icon">
                  👤
                </div>

                <div>

                  <h2>
                    Personal Information
                  </h2>

                  <p>
                    Your SilentSync profile details
                  </p>

                </div>

              </div>


              {!editing ? (

                <div className="personal-details">

                  <div className="detail-row">

                    <span>
                      Full Name
                    </span>

                    <strong>
                      {name}
                    </strong>

                  </div>


                  <div className="detail-row">

                    <span>
                      Email
                    </span>

                    <strong>
                      {email || "Not added"}
                    </strong>

                  </div>


                  <div className="detail-row">

                    <span>
                      Account Type
                    </span>

                    <strong>
                      Learner
                    </strong>

                  </div>


                  <div className="detail-row">

                    <span>
                      Learning Platform
                    </span>

                    <strong>
                      SilentSync
                    </strong>

                  </div>


                  <button
                    type="button"
                    className="personal-edit-button"
                    onClick={openEditProfile}
                  >
                    ✏️ Edit Information
                  </button>

                </div>

              ) : (

                <div className="personal-edit-form">

                  <div className="personal-edit-field">

                    <label>
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={editName}
                      onChange={(event) =>
                        setEditName(
                          event.target.value
                        )
                      }
                      placeholder="Enter your name"
                    />

                  </div>


                  <div className="personal-edit-field">

                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      value={editEmail}
                      onChange={(event) =>
                        setEditEmail(
                          event.target.value
                        )
                      }
                      placeholder="Enter your email"
                    />

                  </div>


                  <div className="personal-edit-actions">

                    <button
                      type="button"
                      className="cancel-edit"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>


                    <button
                      type="button"
                      className="save-edit"
                      onClick={saveProfile}
                    >
                      Save Changes
                    </button>

                  </div>

                </div>

              )}

            </div>


            {/* PROFILE PICTURE */}

            <div className="profile-panel">

              <div className="panel-heading">

                <div className="panel-icon">
                  📷
                </div>

                <div>

                  <h2>
                    Profile Picture
                  </h2>

                  <p>
                    Your profile appearance
                  </p>

                </div>

              </div>


              <div className="picture-content">

                <div className="profile-picture-large">

                  <img
                    src={currentProfileImage}
                    alt="Profile"
                  />

                </div>


                <div className="picture-options">

                  <button
                    className={
                      !showAvatar
                        ? "selected-picture"
                        : ""
                    }
                    onClick={() =>
                      setShowAvatar(false)
                    }
                  >
                    📷 Real Photo
                  </button>


                  <button
                    className={
                      showAvatar
                        ? "selected-picture"
                        : ""
                    }
                    onClick={() =>
                      setShowAvatar(true)
                    }
                  >
                    👤 Avatar
                  </button>

                </div>

              </div>

            </div>


            {/* STATISTICS */}

            <div className="profile-panel statistics-panel">

              <div className="panel-heading">

                <div className="panel-icon">
                  📊
                </div>

                <div>

                  <h2>
                    Learning Statistics
                  </h2>

                  <p>
                    Your current performance
                  </p>

                </div>

              </div>


              <div className="learning-rings">

                <div className="ring-stat">

                  <div className="progress-ring purple-ring">

                    <span>
                      {wordProgress}%
                    </span>

                  </div>

                  <strong>
                    Word Progress
                  </strong>

                  <small>
                    {completedWords} words
                  </small>

                </div>


                <div className="ring-stat">

                  <div className="progress-ring blue-ring">

                    <span>
                      {levelProgress}%
                    </span>

                  </div>

                  <strong>
                    Level Progress
                  </strong>

                  <small>
                    {levelsCompleted} levels
                  </small>

                </div>


                <div className="ring-stat">

                  <div className="progress-ring pink-ring">

                    <span>
                      {overallProgress}%
                    </span>

                  </div>

                  <strong>
                    Overall
                  </strong>

                  <small>
                    Learning journey
                  </small>

                </div>

              </div>

            </div>


            {/* ACHIEVEMENTS */}

            <div className="profile-panel">

              <div className="panel-heading">

                <div className="panel-icon">
                  🏆
                </div>

                <div>

                  <h2>
                    Achievements
                  </h2>

                  <p>
                    Milestones you've reached
                  </p>

                </div>

              </div>


              <div className="achievement-list">

                <div
                  className={`achievement-item ${
                    completedWords < 1
                      ? "achievement-locked"
                      : ""
                  }`}
                >

                  <div className="achievement-icon green-achievement">
                    {completedWords >= 1
                      ? "🌱"
                      : "🔒"}
                  </div>

                  <div>

                    <strong>
                      First Word
                    </strong>

                    <span>
                      {completedWords >= 1
                        ? "Complete your first word"
                        : "Achievement locked"}
                    </span>

                  </div>

                </div>


                <div
                  className={`achievement-item ${
                    completedWords < 10
                      ? "achievement-locked"
                      : ""
                  }`}
                >

                  <div className="achievement-icon orange-achievement">
                    {completedWords >= 10
                      ? "🔥"
                      : "🔒"}
                  </div>

                  <div>

                    <strong>
                      10 Words
                    </strong>

                    <span>
                      {completedWords >= 10
                        ? "Complete 10 words"
                        : "Achievement locked"}
                    </span>

                  </div>

                </div>


                <div
                  className={`achievement-item ${
                    levelsCompleted < 1
                      ? "achievement-locked"
                      : ""
                  }`}
                >

                  <div className="achievement-icon purple-achievement">
                    {levelsCompleted >= 1
                      ? "🏆"
                      : "🔒"}
                  </div>

                  <div>

                    <strong>
                      First Level
                    </strong>

                    <span>
                      {levelsCompleted >= 1
                        ? "Complete your first level"
                        : "Achievement locked"}
                    </span>

                  </div>

                </div>


                <div
                  className={`achievement-item ${
                    levelsCompleted < 5
                      ? "achievement-locked"
                      : ""
                  }`}
                >

                  <div className="achievement-icon blue-achievement">
                    {levelsCompleted >= 5
                      ? "⭐"
                      : "🔒"}
                  </div>

                  <div>

                    <strong>
                      Level Master
                    </strong>

                    <span>
                      {levelsCompleted >= 5
                        ? "Complete 5 levels"
                        : "Achievement locked"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* QUOTE */}

          <section className="profile-quote-card">

            <span className="quote-mark">
              “
            </span>

            <p>
              Every sign you learn brings you one step
              closer to communicating without barriers.
            </p>

            <span className="quote-author">
              — SilentSync
            </span>

          </section>


          {/* QUICK ACTIONS */}

          <section className="quick-actions">

            <button
              className="quick-primary"
              onClick={continueLearning}
            >

              <span>
                📚
              </span>

              <div>

                <strong>
                  Continue Learning
                </strong>

                <small>
                  Continue your next word level
                </small>

              </div>

              <span>
                →
              </span>

            </button>


            <Link
              to="/game"
              className="quick-secondary"
            >

              <span>
                🎮
              </span>

              <div>

                <strong>
                  Practice Game
                </strong>

                <small>
                  Test your sign language skills
                </small>

              </div>

              <span>
                →
              </span>

            </Link>

          </section>


          {/* BOTTOM BANNER */}

          <section className="profile-bottom-banner">

            <div className="bottom-banner-icon">
              🤟
            </div>

            <div>

              <h2>
                Keep going!
              </h2>

              <p>
                You're building your sign language skills
                one word at a time.
              </p>

            </div>

            <div className="banner-decoration">
              ✦ ✧ ✦
            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default Profile;