import knooppunten from './knooppunten';

function renderMainPage(props) {
  return (
    <Page>

      <Section title="Simple item list">
        <AdditiveList
          title="A list with Autocomplete"
          settingsKey="list"
          maxItems="5"
          addAction={(
            <TextInput
              title="Add List Item"
              label="➡️ Add item"
              placeholder="Type something"
              action="Add Item"
              onAutocomplete={(value) => knooppunten.filter((option) => option.name.toLowerCase().indexOf(value.toLowerCase()) >= 0)}
            />
          )}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage((props) => {
  let result = renderMainPage;
  return result(props);
});
