import React, { useContext, useState } from "react";
import { Tab, Header, Card, Image, Button, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import PhotoUploadWidget from "../../app/common/photoUpload/PhotoUploadWidget";
import { observer } from "mobx-react-lite";

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);

  const {
    profile,
    isCurrentUser,
    uploadPhoto,
    uploadingPhoto,
    loading,
    deletePhoto,
    setMainPhoto
  } = rootStore.profileStore;

  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [targetButton, setTarget] = useState<string | undefined>(undefined);
  const [deleteTargetButton, setDeleteTarget] = useState<string | undefined>(
    undefined
  );

  const handeUploadImage = (photo: Blob) => {
    uploadPhoto(photo).then(() => setAddPhotoMode(false));
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="image" content="Photos"></Header>
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            ></Button>
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handeUploadImage}
              loading={uploadingPhoto}
            ></PhotoUploadWidget>
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.photos.map(photo => (
                  <Card key={photo.id}>
                    <Image src={photo.url}></Image>
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          name={photo.id}
                          onClick={e => {
                            deletePhoto(photo);
                            setDeleteTarget(e.currentTarget.name);
                          }}
                          disabled={photo.isMain}
                          loading={loading && deleteTargetButton === photo.id}
                          basic
                          negative
                          icon="trash"
                        ></Button>
                        <Button
                          name={photo.id}
                          basic
                          onClick={e => {
                            setTarget(e.currentTarget.name);
                            setMainPhoto(photo);
                          }}
                          disabled={photo.isMain}
                          loading={loading && targetButton === photo.id}
                          positive
                          content="Main"
                        ></Button>
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);
