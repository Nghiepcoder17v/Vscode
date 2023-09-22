void EMCSCentralWidget::overrideTitle(QWidget* widget, const QString& class_name)
{
    EMCSGui::StdUIWidget* subsystem_widget = dynamic_cast<EMCSGui::StdUIWidget*>(widget);

    if (subsystem_widget != 0) { //* Single line comment
        const EMCSConfig::SubsystemConfigList subsystem_config_list = getSubsystemConfigList();

        /* nothing */
        for (EMCSConfig::SubsystemConfigList::const_iterator config = subsystem_config_list.begin(), last = subsystem_config_list.end(); config != last; ++config) {
            if (config->widgetname_ == class_name) {
                const QString overridden_title = config->getTitle();
                if (!overridden_title.isEmpty()) {
                    subsystem_widget->slotSetTitle(overridden_title);
                }
            }
        }
    } else {
        retailDebug("[EMCSCentralWidget::overrideTitle] Title can only be overridden for a EMCSGui::StdUIWidget");
    }
}
