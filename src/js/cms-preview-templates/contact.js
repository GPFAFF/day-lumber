import React from "react";

const ContactEntry = ({heading, text, additionalText, subheader}) =>
  <div className="flex-1">
    <h4 className="f4 b lh-title mb2 primary">{ heading }</h4>
    <h5 className="f4 b lh-title mb2 primary">{ subheader }</h5>
    <p>{ text }</p>
    <p>{ additionalText }</p>
  </div>;

const ContactEntries = ({data}) => (data && data.length > 0
  ? <div className="flex-ns mb3">
    {data.map(({heading, subheader, text, additionalText}) =>
      <ContactEntry
        heading={heading}
        subheader={subheader}
        text={text}
        additionalText={additionalText}
      />)}
  </div>
  : "");

export default class ContactPreview extends React.Component {
  render() {
    const {entry, getAsset, widgetFor} = this.props;
    const entryContactEntries = entry.getIn(["data", "contact_entries"]);
    const contactEntries = entryContactEntries ? entryContactEntries.toJS() : [];
    return <div className="ph3 bg-off-white">
      <img src={getAsset(entry.getIn(["data", "logo"]))} alt="" className="db w4 center pv4" />
      <div className="center mw6 pv3">
        { widgetFor("body") }
        <ContactEntries data={contactEntries} />
      </div>
    </div>;
  }
}
